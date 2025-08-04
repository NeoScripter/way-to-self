<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Money\Currencies\ISOCurrencies;
use Money\Currency;
use Money\Formatter\DecimalMoneyFormatter;
use Money\Money;

class Tier extends Model
{
    /** @use HasFactory<\Database\Factories\TierFactory> */
    use HasFactory;

    public function images(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function image(): MorphOne
    {
        return $this->images()->where('type', 'image');
    }

    public function cart(): BelongsTo
    {
        return $this->belongsTo(TierCart::class);
    }

    protected function price(): Attribute
    {
        return Attribute::make(
            get: function (int $value) {
                return new Money($value, new Currency('RUB'));
            }
        );
    }

    public function getDecimalPrice(): string
    {
        if (! $this->price) {
            return '';
        }

        $currencies = new ISOCurrencies;
        $formatter = new DecimalMoneyFormatter($currencies);
        $decimal = $formatter->format($this->price);

        return $decimal;
    }
}
