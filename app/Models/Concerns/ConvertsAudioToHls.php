<?php

namespace App\Models\Concerns;

use App\Jobs\ConvertAudioToHls;

trait ConvertsAudioToHls
{
    protected static function bootConvertsAudioToHls()
    {
        static::created(function (self $model) {
            dispatch(new ConvertAudioToHls($model));
        });
        static::updated(function (self $model) {
            dispatch(new ConvertAudioToHls($model));
        });
    }
}
