<?php

namespace App\Models;

use App\Enums\DiscountType;
use App\Models\Concerns\ConvertsMarkdownToHtml;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Tier extends Model
{
    /** @use HasFactory<\Database\Factories\TierFactory> */
    use HasFactory, ConvertsMarkdownToHtml;

    public function images(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function image(): MorphOne
    {
        return $this->images()->where('type', 'image');
    }

    public function cart(): BelongsToMany
    {
        return $this->belongsToMany(TierCart::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withTimestamps()
            ->withPivot(['expires_at', 'warning_count']);
    }

    public function getDiscountedPrice(Promo | null $promo)
    {
        $sum = $this->price;

        if ($promo && Carbon::parse($promo->expires_at)->isFuture()) {
            if ($promo->discount_type === DiscountType::PERCENT->value) {
                $sum = intdiv($sum * (100 - $promo->discount), 100);
            } else {
                $sum -= $promo->discount;
            }
        }

        return max($sum, 0);
    }
}
