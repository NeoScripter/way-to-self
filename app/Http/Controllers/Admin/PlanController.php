<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Plan;
use App\Services\ImageResizer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class PlanController extends Controller
{
    public function index()
    {
        $count = Plan::all()->count();
        $plans = Plan::latest()->with(['image'])->paginate(16);

        return Inertia::render('admin/plans/index', [
            'plans' => fn() => $plans,
            'count' => fn() => $count
        ]);
    }


    public function show(Plan $plan)
    {
        $count = Plan::all()->count();

        return Inertia::render('admin/plans/show', [
            'plan' => fn() => $plan,
            'count' => fn() => $count,
        ]);
    }

    public function create()
    {
        $count = Plan::all()->count();

        return Inertia::render('admin/plans/create', [
            'count' => $count,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|min:1|max:100',
            'expires_at'    => 'required|date',
            'discount'      => 'required|numeric|min:0',
            'discount_type' => 'required|string|in:currency,percent',
        ]);

        Plan::create($validated);

        return redirect()->route('admin.plans.index')->with('message', 'Тариф успешно создан');
    }

    public function toggle(Plan $plan)
    {
        $plan->update(['enabled' => !$plan->enabled]);

        $message = $plan->enabled
            ? "тариф успешно активирован"
            : "тариф успешно деактивирован";

        return redirect()
            ->back()
            ->with('message', $message);
    }

    public function destroy(Plan $plan)
    {
        $plan->delete();

        return redirect()->route('admin.plans.index')->with('message', 'Тариф успешно удален');
    }

    public function update(Plan $plan, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'        => 'nullable|string|max:100',
            'description' => 'nullable|sometimes|string|max:500',
            'tier_count'  => 'nullable|numeric|min:1|max:3',
            'price'       => 'nullable|numeric',
            'image'       => 'nullable|image',
        ]);

        $plan->update(Arr::except($validated, ['image']));

        if ($request->hasFile('image')) {
            if ($plan->image) {
                $plan->image->delete();
            }

            $file = $request->file('image');
            $paths = app(ImageResizer::class)->handleImage($file);

            $image = new Image([
                'type'      => 'image',
                'alt'      => 'image',
                'path'      => $paths['original'],
                'tiny_path' => $paths['tiny'],
            ]);

            $plan->image()->save($image);
        }

        return redirect()->back();
    }
}
