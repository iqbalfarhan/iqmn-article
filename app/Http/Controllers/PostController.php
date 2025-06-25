<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\StorePostThumbnailRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = Auth::id();

        return Inertia::render('post/index', [
            'posts' => Post::whereUserId($user_id)->with('user')->orderByDesc('published')->get(),
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
    public function store(StorePostRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $data['user_id'] = $user->id;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store("{$user->email}");
            $data['image'] = $path;
        }
        

        $post = Post::create($data);

        return redirect()->route('post.edit', $post);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Inertia::render('post/show', [
            'post' => $post->load('user'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $user = Auth::user();

        return Inertia::render('post/edit', [
            'medias' => $user->medias(),
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $data = $request->validated();
        $post->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
    }

    /**
     * Update post thumbnail.
     */
    public function updateThumbnail(StorePostThumbnailRequest $request, Post $post)
    {
        $email = Auth::user()->email;
        $request->validated();
        
        if ($request->hasFile('image')) {
            $file = $request->file('image');

            // Buat nama file: thumbnail-{post_id}.ext
            $filename = "thumbail/thumbnail-{$post->id}." . $file->getClientOriginalExtension();

            // Simpan ke folder berdasarkan email
            $file->storeAs($email, $filename);

            // Update nama file ke kolom image (misal lo simpen nama aja)
            $post->update([
                'image' => $email . '/' . $filename,
            ]);
        }
    }
}
