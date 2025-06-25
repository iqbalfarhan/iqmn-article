<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMediaRequest extends FormRequest
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
            'file' => 'required|array',
            'file.*' => 'required|image|max:2048|mimes:jpg,jpeg,png,gif,svg',
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'Harus isi file',
            'file.*.required' => 'File harus diisi',
            'file.*.image' => 'File harus berupa gambar',
            'file.*.max' => 'Ukuran file maksimal 2MB',
            'file.*.mimes' => 'File harus berupa gambar',
        ];
    }
}
