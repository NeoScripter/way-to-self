<?php

namespace App\Support;

class TelegramText
{
    public static function sanitizeForMarkdown(string $text): string
    {
        if ($text === '') {
            return '';
        }

        $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = str_replace(["\r\n", "\r"], "\n", $text);
        $text = preg_replace('/<\s*\/\s*p\s*>/i', "\n\n", $text);
        $text = preg_replace('/<\s*p[^>]*>/i', '', $text);
        $text = preg_replace('/<\s*br\s*\/?>/i', "\n", $text);
        $text = strip_tags($text);
        $text = str_replace(["\xc2\xa0", "&nbsp;"], ' ', $text);
        $text = preg_replace("/\n{3,}/", "\n\n", $text);
        $text = trim($text);

        if ($text === '') {
            return '';
        }

        $text = str_replace('\\', '\\\\', $text);

        $specials = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];
        foreach ($specials as $char) {
            $text = str_replace($char, '\\' . $char, $text);
        }

        return $text;
    }
}
