<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
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
            'content' => 'nullable|string',
            'tags' => 'nullable|array|max:255',
            'published' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'title.string' => 'The title field must be a string.',
            'title.max' => 'The title field must be less than 255 characters.',
            'title.required' => 'The title field is required.',

            'content.string' => 'The content field must be a string.',

            'tags.array' => 'The tags field must be an array.',
            'tags.max' => 'The tags field must be less than 255 characters.',
            
            'published.boolean' => 'The published field must be a boolean.',
        ];
    }
}
