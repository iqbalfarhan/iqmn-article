<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user_id = Auth::id();

        return Inertia::render('dashboard', [
            'posts' => Post::whereUserId($user_id)->with('user')->latest()->limit(4)->get(),
            'counts' => [
                'posts' => Post::whereUserId($user_id)->count(),
                'unpublish' => Post::whereUserId($user_id)->where('published', false)->count(),
                'medium' => Auth::user()->medias()->count()
            ]
        ]);
    }
}
