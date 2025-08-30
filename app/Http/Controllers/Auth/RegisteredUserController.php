<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\TierCart;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'telegram' => 'required|string|max:255|unique:' . User::class,
            'agreedData' => 'required|accepted',
            'agreedPolicy' => 'required|accepted',
        ]);

        $randomPassword = Str::random(12);

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'telegram' => $request->telegram,
            'email' => $request->email,
            'password' => Hash::make($randomPassword),
        ]);

        Mail::send('emails.password', ['password' => $randomPassword], function ($message) use ($user) {
            $message->to($user->email)
                ->subject('Пароль от вашего аккаунта');
        });

        event(new Registered($user));

        session([
            'payment_user_id' => $user->id,
        ]);

        return redirect()->route('payment.process');
    }

    public function processPayment(Request $request)
    {
        sleep(2);

        $cart = TierCart::getCart();

        if (Auth::check()) {
            $user = Auth::user();
        } else {
            $userId = session('payment_user_id');
            $user = User::findOrFail($userId);
        }

        if (!$user) {
            return redirect()->route('tiers.index')->with('message', 'Ошибка инициации платежа');
        }

        $cart->tiers()->each(function ($tier) use ($user) {
            $existingPurchase = $user->tiers()->where('tier_id', $tier->id)->first();

            if ($existingPurchase) {
                // User already has this tier - extend by one year
                $newPurchasedAt = \Carbon\Carbon::parse($existingPurchase->pivot->purchased_at)->addYear();
                $user->tiers()->updateExistingPivot($tier->id, [
                    'purchased_at' => $newPurchasedAt
                ]);
            } else {
                // Create new relationship with today's date
                $user->tiers()->attach($tier->id, [
                    'purchased_at' => now()
                ]);
            }
        });

        $cart->tiers()->detach();

        session()->forget(['payment_user_id']);

        if (Auth::check()) {
            return redirect()
                ->route('account')
                ->with('message', 'Подписка успешно продлена!');
        } else {
            return Inertia::render('user/payment', [
                'heading' => 'Поздравляем',
                'body' => 'Платеж успешно завершен!'
            ]);
        }
    }
}
