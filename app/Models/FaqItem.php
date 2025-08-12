<?php

namespace App\Models;

use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FaqItem extends Model
{
    use ConvertsMarkdownToHtml;

    /** @use HasFactory<\Database\Factories\FaqItemFactory> */
    use HasFactory;

    protected $guarded = ['id'];
}
