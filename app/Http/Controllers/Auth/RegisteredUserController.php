<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\TierCart;
use App\Models\User;
use App\Notifications\SendPasswordNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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
        $request->merge([
            'telegram' => $request->telegram
                ? ltrim($request->telegram, '@')
                : null,
        ]);

        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
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

        // Mail::send('emails.password', ['password' => $randomPassword], function ($message) use ($user) {
        //     $message->to($user->email)
        //         ->subject('Пароль от вашего аккаунта');
        // });

        $user->notify(new SendPasswordNotification($randomPassword));

        event(new Registered($user));

        session([
            'payment_user_id' => $user->id,
        ]);

        return redirect()->route('payment.process');
    }

    public function processPayment()
    {

        $cart = TierCart::getCart();

        if ($cart->isEmpty()) {
            return redirect()->route('tiers.index')->with('message', 'Корзина пустая');
        }

        // TODO
        // Process payment
        sleep(1);

        if (Auth::check()) {
            $user = Auth::user();
        } else {
            $userId = session('payment_user_id');
            $user = User::findOrFail($userId);
        }

        if (!$user) {
            return redirect()->route('tiers.index')->with('message', 'Ошибка инициации платежа');
        }

        $cart->assignTiers($user);

        $cart->clear();

        session()->forget(['payment_user_id']);

        if (Auth::check()) {
            return redirect()
                ->route('account')
                ->with('message', 'Подписка успешно продлена!');
        } else {
            return Inertia::render('user/payment', [
                'status' => 'success'
            ]);
        }
    }
}
