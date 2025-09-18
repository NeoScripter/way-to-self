<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\RoleEnum;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes, Prunable;

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
            ->withPivot(['expires_at', 'warning_count']);
    }

    public static function favoriteRelation(
        User $user,
        string $class,
        array $columns = ['*']
    ) {
        return $user->morphedByMany($class, 'favorable', 'favorites')
            ->select($columns)
            ->with('image');
    }

    public function favorites()
    {
        return $this->morphToMany(Model::class, 'favorable', 'favorites')
            ->withTimestamps();
    }

    public function favoritesOf(string $class)
    {
        return $this->morphedByMany($class, 'favorable', 'favorites')
            ->withTimestamps();
    }

    public static function toggleFavorite(User $user, string $class, int $id): bool
    {
        $relatedTable = (new $class)->getTable();

        $relation = $user->morphedByMany($class, 'favorable', 'favorites');

        if ($relation->where("{$relatedTable}.id", $id)->exists()) {
            $relation->detach($id);
            return false;
        }

        $relation->attach($id);
        return true;
    }

    public function hasTier($tierRoute): bool
    {
        return $this->tiers()->where('route', $tierRoute)->exists();
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }

    public function setTelegramAttribute(?string $value): void
    {
        $this->attributes['telegram'] = $value
            ? Str::lower(ltrim($value, '@'))
            : null;
    }

    public function getTelegramAttribute(?string $value): ?string
    {
        return $value ? '@' . $value : null;
    }

    protected static function booted(): void
    {
        static::created(function ($user) {
            $role = Role::where('name', RoleEnum::USER->value)->first();

            if ($role) {
                $user->roles()->attach($role->id);
            }
        });
    }

    public function prunable()
    {
        return static::leftJoin('tier_user', 'users.id', '=', 'tier_user.user_id')
            ->select('users.*', DB::raw('MAX(tier_user.expires_at) as max_expires_at'))
            ->groupBy('users.id')
            ->havingRaw('max_expires_at IS NULL OR max_expires_at < ?', [now()->subWeeks(2)]);
    }
}
