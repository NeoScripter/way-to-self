<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Audio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StreamAudioController extends Controller
{
    /**
     * Serve the HLS playlist (.m3u8) for the given audio.
     */
    public function stream(Audio $audio)
    {
        $playlistPath = storage_path("app/private/audios/{$audio->id}/index.m3u8");

        if (! file_exists($playlistPath)) {
            abort(404, 'Playlist not found');
        }

        // Load and rewrite playlist: replace segment filenames with full route URLs
        $playlist = file_get_contents($playlistPath);

        $playlist = preg_replace_callback(
            '/(index\d+\.ts)/',
            fn($matches) => route('audio.segment', [
                'audio' => $audio->id,
                'file'  => $matches[1],
            ]),
            $playlist
        );

        return response($playlist, 200)
            ->header('Content-Type', 'application/vnd.apple.mpegurl');
    }

    /**
     * Serve an HLS segment (.ts) for the given audio.
     */
    public function segment(Audio $audio, string $file)
    {
        $segmentPath = storage_path("app/private/audios/{$audio->id}/{$file}");

        if (! file_exists($segmentPath)) {
            abort(404, 'Segment not found');
        }

        return response()->stream(
            fn() => readfile($segmentPath),
            200,
            ['Content-Type' => 'video/MP2T']
        );
    }
}
