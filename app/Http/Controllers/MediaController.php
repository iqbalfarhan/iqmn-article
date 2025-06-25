<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMediaRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('media/index', [
            'medias' => $user->medias()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request)
    {
        $email = Auth::user()->email;
        foreach ($request->file('file') as $file) {
            $originalName = time()."-".$file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
    
            // Buat slug dari nama file tanpa extension
            $nameWithoutExt = pathinfo($originalName, PATHINFO_FILENAME);
            $slugName = Str::slug($nameWithoutExt); // jadi my-image-1
    
            // Gabungin sama extension-nya
            $slugFilename = $slugName . '.' . $extension;
    
            // Simpen file
            $file->storeAs($email, $slugFilename);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $medium)
    {
        $email = Auth::user()->email;
        Storage::delete("/{$email}/{$medium}");
    }
}
