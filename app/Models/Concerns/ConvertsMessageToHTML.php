<?php

namespace App\Models\Concerns;

trait ConvertsMessageToHTML
{
    protected static function bootConvertsMessageToHTML()
    {
        static::saving(function (self $model) {
            $markdownData = collect(self::getMarkdownToHtmlMap())
                ->flip()
                ->map(fn ($bodyColumn) => str($model->$bodyColumn)->markdown([
                    'html_input' => 'strip',
                    'allow_unsafe_links' => false,
                    'max_nesting_level' => 5,
                ]));

            return $model->fill($markdownData->all());
        });
    }

    protected static function getMarkdownToHtmlMap(): array
    {
        return [
            'telegram_greeting' => 'telegram_greeting_html',
            'doesntexist' => 'telegram_greeting_html',
        ];
    }
}
