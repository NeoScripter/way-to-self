<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionSearchController extends Controller
{
    public function __invoke(Request $request) {

        return Inertia::render('account/search');
    }
}
