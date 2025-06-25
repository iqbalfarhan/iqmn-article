<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'tags' => 'required|array|max:255',
            'published' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'title.string' => 'The title field must be a string.',
            'title.max' => 'The title field must be less than 255 characters.',
            'content.required' => 'The content field is required.',
            'content.string' => 'The content field must be a string.',
            'image.image' => 'The image field must be a image.',
            'image.mimes' => 'The image field must be a image.',
            'image.max' => 'The image field must be less than 2048 kilobytes.',
            'tags.required' => 'The tags field is required.',
            'tags.array' => 'The tags field must be an array.',
            'tags.max' => 'The tags field must be less than 255 characters.',
            'published.required' => 'The published field is required.',
            'published.boolean' => 'The published field must be a boolean.',
        ];
    }
}
