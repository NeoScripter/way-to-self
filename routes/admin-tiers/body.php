<?php

use App\Http\Controllers\Admin\Body\FAQController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'banned', 'role:admin,editor'])->prefix('admin/body')->name('admin.body.')->group(function () {
    Route::post('/faqs/store', [FAQController::class, 'store'])->name('faqs.store');
    Route::get('/faqs', [FAQController::class, 'index'])->name('faqs.index');
    Route::post('/faqs/{faq}', [FAQController::class, 'update'])->name('faqs.update');
    Route::delete('/faqs/{faq}', [FAQController::class, 'destroy'])->name('faqs.destroy');
});
