<?php

namespace App\Http\Controllers\Admin\Body;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Jobs\ProcessAndAttachVideo;
use App\Models\CategoryFilter;
use App\Models\Exercise;
use App\Models\Image;
use App\Models\Program;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:title,updated_at',
            'order' => 'nullable|in:asc,desc',
            'search' => 'nullable|string'
        ]);

        $sortBy = $validated['sort_by'] ?? 'title';
        $order = $validated['order'] ?? 'asc';
        $search = $validated['search'] ?? null;

        $options = [
            ['value' => 'title',  'label' => 'По названию'],
            ['value' => 'updated_at', 'label' => 'По дате изменения'],
        ];

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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:400',
            'description' => 'required|string|max:4000',
            'body'        => 'required|string|max:64000',
            'duration'    => 'required|numeric|min:1|max:200',
            'complexity'  => 'required|numeric|min:1|max:10',
            'filters' => 'required|array',
            'filters.*' => 'numeric|exists:category_filters,id',
            'image_alt'   => 'required|string|max:400',
            'image'       => 'required|mimes:jpg,jpeg,png,bmp,webp,svg|max:20480',
            'video'       => ['required', 'file', 'mimetypes:video/mp4,video/quicktime,video/x-matroska'],
        ]);

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

    public function update(Program $program, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:400',
            'description' => 'required|string|max:4000',
            'body'        => 'required|string|max:64000',
            'duration'    => 'required|numeric|min:1|max:200',
            'complexity'  => 'required|numeric|min:1|max:10',
            'filters' => 'required|array',
            'filters.*' => 'numeric|exists:category_filters,id',
            'image_alt'   => 'nullable|string|max:400',
            'image'       => 'nullable|mimes:jpg,jpeg,png,bmp,webp,svg|max:20480',
            'video'       => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/x-matroska'],
        ]);

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
