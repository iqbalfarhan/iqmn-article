<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function home()
    {
        return Inertia::render('welcome/index', [
            'posts' => Post::with('user')->wherePublished(true)->orderBy('updated_at')->get()
        ]);
    }

    public function article(string $slug)
    {
        return Inertia::render('welcome/show', [
            'post' => Post::with('user')->whereSlug($slug)->firstOrFail()
        ]);
    }
}
