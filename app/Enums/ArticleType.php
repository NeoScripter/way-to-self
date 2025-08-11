<?php

namespace App\Enums;

enum ArticleType: string
{
    case NEWS = 'news';
    case SOUL = 'soul';
    case NUTRITION = 'nutrition';
    case EXERCISE = 'exercise';
}
