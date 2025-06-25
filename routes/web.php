<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;


Route::middleware(['guest'])->group(function () {
    Route::get('/', [WelcomeController::class, 'home'])->name('home');
    Route::get('/article/{slug}', [WelcomeController::class, 'article'])->name('article');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::post('/post/{post}/thumbnail', [PostController::class, 'updateThumbnail'])->name('post.thumbnail');
    Route::resource('post', PostController::class);
    Route::resource('media', MediaController::class);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
