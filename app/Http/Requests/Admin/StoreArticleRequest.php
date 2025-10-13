<?php

namespace App\Http\Requests\Admin;

use App\Rules\AdminFieldRules;
use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => AdminFieldRules::title(),
            'description' => AdminFieldRules::description(),
            'body' => AdminFieldRules::body(),
            'image_alt' => AdminFieldRules::imageAlt(),
            'thumbnail_alt' => AdminFieldRules::imageAlt(),
            'image' => AdminFieldRules::image(),
            'thumbnail' => AdminFieldRules::image(),
        ];
    }
}
