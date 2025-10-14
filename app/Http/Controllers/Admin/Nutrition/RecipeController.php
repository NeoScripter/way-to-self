<?php

namespace App\Http\Controllers\Admin\Nutrition;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Nutrition\StoreRecipeRequest;
use App\Http\Requests\Admin\Nutrition\UpdateRecipeRequest;
use App\Jobs\ProcessAndAttachVideo;
use App\Models\CategoryFilter;
use App\Models\ContentCategory;
use App\Models\Exercise;
use App\Models\Image;
use App\Models\Recipe;
use App\Support\SortAndSearchHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $sorting = SortAndSearchHelper::extract($request);

        $sortBy = $sorting['sort_by'];
        $order = $sorting['order'];
        $search = $sorting['search'];
        $options = $sorting['options'];

        $count = Recipe::count();

        $recipes = Recipe::with(['image'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('title LIKE ?', ["%{$search}%"]);
                });
            })->orderBy($sortBy, $order)
            ->paginate(16)
            ->withQueryString();

        return Inertia::render('admin/nutrition/recipes/index', [
            'recipes' => fn() => $recipes,
            'options' => fn() => $options,
            'count' => fn() => $count,
        ]);
    }


    public function show(Recipe $recipe)
    {
        $count = Recipe::count();

        $recipe->load([
            'image',
            'filters',
            'infos' => fn($q) => $q->orderBy('order'),
            'steps' => fn($q) => $q->orderBy('order'),
        ]);

        $filters = CategoryFilter::select(['id', 'name'])
            ->whereNotNull('name')
            ->where('category', '=', CategoryType::RECIPES)
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

        $categories = ContentCategory::select(['id', 'name'])
            ->where('categorizable_type', Recipe::class)
            ->get();

        $categories = $categories->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        })->toArray();

        $video = $recipe->video?->hlsVideo();

        return Inertia::render('admin/nutrition/recipes/show', [
            'recipe' => fn() => $recipe,
            'count' => fn() => $count,
            'filters' => fn() => $filters,
            'video' => fn() => $video,
            'options' => fn() => $exercises,
            'categories' => fn() => $categories,
        ]);
    }

    public function create()
    {
        $count = Recipe::count();

        $filters = CategoryFilter::select(['id', 'name'])
            ->whereNotNull('name')
            ->where('category', '=', CategoryType::RECIPES)
            ->get();

        $filters = $filters->map(function ($filter) {
            return [
                'value' => $filter->id,
                'label' => $filter->name,
            ];
        })->toArray();

        $categories = ContentCategory::select(['id', 'name'])
            ->where('categorizable_type', Recipe::class)
            ->get();

        $categories = $categories->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        })->toArray();

        return Inertia::render('admin/nutrition/recipes/create', [
            'count' => $count,
            'filters' => fn() => $filters,
            'categories' => fn() => $categories,
        ]);
    }

    public function store(StoreRecipeRequest $request)
    {
        $validated = $request->validated();

        $recipe = Recipe::create(Arr::except($validated, ['image', 'category_id', 'filters', 'image_alt', 'video']));

        $recipe->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($recipe->image) {
                $recipe->image->delete();
            }
            Image::attachTo($recipe, $request->file('image'), $validated['image_alt'], 360, 'image');
        }

        if ($request->hasFile('video')) {
            if ($recipe->video) {
                $recipe->video->delete();
            }
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($recipe, $tempPath);
            return redirect()
                ->route('admin.nutrition.recipes.index')
                ->with('message', 'Рецепт успешно создан. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()
            ->route('admin.nutrition.recipes.index')
            ->with('message', 'Рецепт успешно создан.');
    }

    public function destroy(Recipe $recipe)
    {
        $recipe->delete();

        return redirect()->route('admin.nutrition.recipes.index')->with('message', 'Рецепт успешно удален');
    }

    public function update(Recipe $recipe, UpdateRecipeRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $recipe->update(Arr::except($validated, ['image', 'category_id', 'filters', 'image_alt', 'video']));

        $recipe->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($recipe->image) {
                $recipe->image->delete();
            }
            Image::attachTo($recipe, $request->file('image'), $validated['image_alt'], 360, 'image');
        }

        if ($request->hasFile('video')) {
            if ($recipe->video) {
                $recipe->video->delete();
            }
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($recipe, $tempPath);
            return redirect()
                ->back()
                ->with('message', 'Рецепт успешно обновлен. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()->back()->with('message', 'Рецепт успешно обновлен!');
    }
}
