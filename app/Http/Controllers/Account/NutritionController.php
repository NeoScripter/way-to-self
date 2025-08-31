<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionController extends Controller
{
    public function index()
    {
        return Inertia::render('account/nutrition');
    }
}
