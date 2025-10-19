<?php

namespace App\Http\Controllers\User\Legal;

use App\Enums\LegalInfoKeys;
use App\Http\Controllers\Controller;
use App\Models\LegalInfo;
use Inertia\Inertia;

class OfferController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $info = LegalInfo::select(['title', 'html'])->where('key', LegalInfoKeys::OFFER)->first();

        return Inertia::render('user/legal-info', [
            'title' => $info->title,
            'html' => $info->html,
        ]);
    }
}
