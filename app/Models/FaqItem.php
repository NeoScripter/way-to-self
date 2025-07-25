<?php

namespace App\Models;

use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FaqItem extends Model
{
    /** @use HasFactory<\Database\Factories\FaqItemFactory> */
    use HasFactory;
    use ConvertsMarkdownToHtml;

    protected $guarded = ['id'];
}
