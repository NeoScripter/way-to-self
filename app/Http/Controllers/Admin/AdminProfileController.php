<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProfileController extends Controller
{
    public function show() {
        return Inertia::render('admin/profile');
    }
}
