<?php

namespace App\Http\Controllers\Admin\Body;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Body\StoreProgramRequest;
use App\Http\Requests\Admin\Body\UpdateProgramRequest;
use App\Jobs\ProcessAndAttachVideo;
use App\Models\CategoryFilter;
use App\Models\Exercise;
use App\Models\Image;
use App\Models\Program;
use App\Support\SortAndSearchHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $sorting = SortAndSearchHelper::extract($request);

        $sortBy = $sorting['sort_by'];
        $order = $sorting['order'];
        $search = $sorting['search'];
        $options = $sorting['options'];

        $count = Program::all()->count();

        $programs = Program::with(['image'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('title LIKE ?', ["%{$search}%"]);
                });
            })->orderBy($sortBy, $order)
            ->paginate(16)
            ->withQueryString();

        return Inertia::render('admin/body/programs/index', [
            'programs' => fn() => $programs,
            'options' => fn() => $options,
            'count' => fn() => $count,
        ]);
    }


    public function show(Program $program)
    {
        $count = Program::all()->count();
        $program->load(['image', 'filters', 'blocks.exercises.image']);

        $filters = CategoryFilter::select(['id', 'name'])
            ->whereNotNull('name')
            ->where('category', '=', CategoryType::PROGRAMS)
            ->get();

        $filters = $filters->map(function ($filter) {
            return [
                'value' => $filter->id,
                'label' => $filter->name,
            ];
        })->toArray();

        $exercises = Exercise::select(['id', 'title'])->with('image')->get()->map(function ($exercise) {
            return [
                'id' => $exercise->id,
                'title' => $exercise->title,
                'image' => $exercise->image->path ?? null
            ];
        });

        $video = $program->video?->hlsVideo();

        return Inertia::render('admin/body/programs/show', [
            'program' => fn() => $program,
            'count' => fn() => $count,
            'filters' => fn() => $filters,
            'video' => fn() => $video,
            'options' => fn() => $exercises,
        ]);
    }

    public function create()
    {
        $count = Program::all()->count();

        $filters = CategoryFilter::select(['id', 'name'])
            ->whereNotNull('name')
            ->where('category', '=', CategoryType::PROGRAMS)
            ->get();

        $filters = $filters->map(function ($filter) {
            return [
                'value' => $filter->id,
                'label' => $filter->name,
            ];
        })->toArray();

        return Inertia::render('admin/body/programs/create', [
            'count' => $count,
            'filters' => fn() => $filters,
        ]);
    }

    public function store(StoreProgramRequest $request)
    {
        $validated = $request->validated();

        $program = Program::create(Arr::except($validated, ['image', 'filters', 'image_alt', 'video']));

        $program->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($program->image) {
                $program->image->delete();
            }
            Image::attachTo($program, $request->file('image'), $validated['image_alt'], 560, 'image');
        }

        if ($request->hasFile('video')) {
            if ($program->video) {
                $program->video->delete();
            }
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($program, $tempPath);
            return redirect()
                ->route('admin.body.programs.index')
                ->with('message', 'Программа успешно создана. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()
            ->route('admin.body.programs.index')
            ->with('message', 'Программа успешно создана.');
    }

    public function destroy(Program $program)
    {
        $program->delete();

        return redirect()->route('admin.body.programs.index')->with('message', 'Программа успешно удалена');
    }

    public function update(Program $program, UpdateProgramRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $program->update(Arr::except($validated, ['image', 'filters', 'image_alt', 'video']));

        $program->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($program->image) {
                $program->image->delete();
            }
            Image::attachTo($program, $request->file('image'), $validated['image_alt'], 560, 'image');
        }

        if ($request->hasFile('video')) {
            if ($program->video) {
                $program->video->delete();
            }
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($program, $tempPath);
            return redirect()
                ->back()
                ->with('message', 'Программа успешно обновлена. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()->back()->with('message', 'Программа успешно обновлена!');
    }
}
