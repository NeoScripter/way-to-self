<?php

namespace App;

trait HasVideos
{
    protected static function bootHasVideo(): void
    {
        static::deleting(function ($model) {
            if (method_exists($model, 'video')) {
                $model->video()->delete();
            }

            if (method_exists($model, 'videos')) {
                $model->videos()->each->delete();
            }
        });
    }
}
