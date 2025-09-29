<?php

namespace App\Enums;

enum DiscountType: string
{
    case PERCENT = 'percent';
    case CURRENCY = 'currency';
}
