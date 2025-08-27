<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function cart(): HasOne
    {
        return $this->hasOne(TierCart::class);
    }

    public function tiers(): BelongsToMany
    {
        return $this->belongsToMany(Tier::class)
            ->withPivot('purchased_at');
    }

    public function favoriteArticles()
    {
        return $this->morphedByMany(Article::class, 'favorable', 'favorites')
            ->select(['articles.id', 'title', 'type', 'description'])
            ->with('image');
    }

    public function favoriteExercises()
    {
        return $this->morphedByMany(Exercise::class, 'favorable', 'favorites')
            ->select(['exercises.id', 'title', 'duration', 'rating', 'type', 'description'])
            ->with('image');
    }

    public function favoriteRecipes()
    {
        return $this->morphedByMany(Recipe::class, 'favorable', 'favorites')
            ->select(['recipes.id', 'title', 'duration', 'rating', 'type', 'description'])
            ->with('image');
    }

    public function favoriteAudio()
    {
        return $this->morphedByMany(Audio::class, 'favorable', 'favorites')
            ->select(['audio.id', 'title', 'duration', 'rating', 'type', 'description'])
            ->with('image');
    }
}
