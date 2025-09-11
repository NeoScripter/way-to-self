<?php

namespace App\Enums;

enum RoleEnum: string
{
    case USER = 'user';
    case EDITOR = 'editor';
    case ADMIN = 'admin';
}
