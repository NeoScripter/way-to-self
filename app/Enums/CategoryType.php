<?php

namespace App\Enums;

enum CategoryType: string
{
    case RECIPES = 'recipes';
    case EXERCISES = 'exercises';
    case AUDIOS = 'audios';
    case PRACTICES = 'practices';
    case PROGRAMS = 'programs';
}
