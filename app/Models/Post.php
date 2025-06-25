<?php

namespace App\Models;

use App\Observers\PostObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy(PostObserver::class)]
class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'image',
        'user_id',
        'tags',
        'published',
    ];

    protected $casts = [
        'published' => 'boolean',
        'tags' => 'array',
    ];

    public $appends = [
        'thumbnail',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getThumbnailAttribute()
    {
        if ($this->image) {
            return asset('storage/' . $this->image);
        }

        return "https://api.dicebear.com/9.x/dylan/png?seed=Administrator";
    }

    public function getDescriptionAttribute()
    {
        $tags = $this->tags ? implode(', ', $this->tags) : '';
        return "Ditulis oleh {$this->user->name}, pada tanggal {$this->created_at->format('d F Y')} tentang {$tags}";
    }
}