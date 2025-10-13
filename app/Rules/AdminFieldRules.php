<?php

namespace App\Rules;

use Illuminate\Validation\Rule;

class AdminFieldRules
{
    public static function title(): array
    {
        return ['required', 'string', 'max:400'];
    }

    public static function description(): array
    {
        return ['required', 'string', 'max:4000'];
    }

    public static function body(): array
    {
        return ['required', 'string', 'max:64000'];
    }

    public static function duration(): array
    {
        return ['required', 'numeric', 'min:1', 'max:200'];
    }

    public static function complexity(): array
    {
        return ['required', 'numeric', 'min:1', 'max:10'];
    }

    public static function filters(): array
    {
        return ['required', 'array'];
    }

    public static function categoryId(): array
    {
        return ['nullable','numeric', Rule::exists('content_categories', 'id')];
    }

    public static function filtersEach(): array
    {
        return ['numeric', Rule::exists('category_filters', 'id')];
    }

    public static function imageAlt(): array
    {
        return ['required', 'string', 'max:400'];
    }

    public static function image(bool $required = true): array
    {
        return array_merge(
            $required ? ['required'] : ['nullable'],
            ['mimes:jpg,jpeg,png,bmp,webp,svg', 'max:20480']
        );
    }

    public static function audio(bool $required = true): array
    {
        return array_merge(
            $required ? ['required'] : ['nullable'],
            ['file', 'mimetypes:audio/mpeg,audio/mp3,audio/wav,audio/x-m4a,audio/aac']
        );
    }

    public static function video(bool $required = true): array
    {
        return array_merge(
            $required ? ['required'] : ['nullable'],
            ['file', 'mimetypes:video/mp4,video/quicktime,video/x-matroska']
        );
    }
}
