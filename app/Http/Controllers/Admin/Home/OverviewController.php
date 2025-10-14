<?php

namespace App\Http\Controllers\Admin\Home;

use App\Http\Controllers\Controller;
use App\Models\Overview;
use Illuminate\Http\Request;
use App\Jobs\ProcessAndAttachVideo;
use App\Rules\AdminFieldRules;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class OverviewController extends Controller
{

    public function show()
    {
        $overview = Overview::first();
        $video = $overview?->video?->hlsVideo();

        return Inertia::render('admin/home/overview', [
            'video' => fn() => $video,
            'overview' => fn() => $overview,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'video' => AdminFieldRules::video()
        ]);

        $overview = Overview::create();

        if ($request->hasFile('video')) {
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($overview, $tempPath);
            return redirect()
                ->back()
                ->with('message', 'Видео успешно обновлено. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()
            ->route('admin.home.overview.show')
            ->with('message', 'Видео успешно создано.');
    }

    public function destroy()
    {
        $overview = Overview::first();
        $overview->delete();

        return redirect()->route('admin.home.overview.show')->with('message', 'Видео успешно удалено');
    }

    public function update(Overview $overview, Request $request): RedirectResponse
    {
        $request->validate([
            'video' => AdminFieldRules::video()
        ]);

        if ($request->hasFile('video')) {
            if ($overview->video) {
                $overview->video->delete();
            }
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($overview, $tempPath);
            return redirect()
                ->back()
                ->with('message', 'Видео успешно обновлено. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()->back()->with('message', 'Видео успешно обновлено!');
    }
}
