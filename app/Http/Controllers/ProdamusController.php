<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tier;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProdamusController extends Controller
{
    public function pay(Request $request)
    {
        $request->validate([
            'do' => 'nullable|in:link,pay'
        ]);

        if (! Auth::check()) {
            return redirect()->back()->with('message', 'Пользователь не найден');
        }

        $user = Auth::user();
        $cart = $user->cart;

        if (! $cart || $cart->isEmpty()) {
            return redirect()->back()->with('message', 'Корзина пустая');
        }

        $promo = $cart->promo;

        $data = [
            'do' => $request->input('do', 'pay'),
            'order_id' => (string) implode(
                '|',
                ($cart->tiers->map(
                    fn($tier) => $tier->id
                ))
                    ->values()
                    ->toArray()
            ) . '-' . time(),
            'customer_email' => $user->email,
            'products' => $cart->tiers->map(function ($tier) use ($promo) {
                return [
                    'name' => 'Тариф "' . mb_convert_case($tier->name, MB_CASE_TITLE, 'UTF-8') . '"',
                    'price' => (string) $tier->getDiscountedPrice($promo),
                    'quantity' => '1',
                ];
            })->values()->toArray(),
        ];

        $data['signature'] = $this->sign($data);

        $url = config('prodamus.url') . '?' . http_build_query($data);
        if ($request->input('do') === 'link') {
            return response()->json(['payment_url' => $url]);
        }

        return Inertia::location($url);
    }

    public function webhook(Request $request)
    {
        Log::info('Prodamus webhook triggered', ['data' => $request->all()]);

        $data = $request->all();
        $signature = $request->header('Sign');
        $signature = preg_replace('/^Sign:\s*/', '', $signature);

        if (!$this->verify($data, $signature)) {
            Log::error('Invalid signature', ['data' => $data]);
            return response('Invalid signature', 400);
        }

        // Extract data
        $customerEmail = $data['customer_email'] ?? null;
        $orderId = $data['order_id'] ?? null;
        $paymentStatus = $data['payment_status'] ?? null;


        if ($orderId == null) {
            Log::warning('Order id is not found', ['status' => $paymentStatus]);
            return response('OK', 200);
        }

        $orderNum = $data['order_num'] ?? null;
        $parts = explode('-', $orderNum);
        $tierIds = $parts[0] ?? null;

        // Validate required fields
        if ($paymentStatus !== 'success') {
            Log::warning('Payment not successful', ['status' => $paymentStatus, 'order_id' => $orderId]);
            return response('OK', 200);
        }

        if (!$customerEmail) {
            Log::error('Customer email missing', ['order_id' => $orderId]);
            return response('OK', 200);
        }

        if (!$tierIds) {
            Log::error('Plan ID missing', ['order_id' => $orderId, 'data' => $data]);
            return response('OK', 200);
        }

        $user = User::where('email', $customerEmail)->first();
        $tiers = Tier::whereIn('id', explode('|', $tierIds))->get();

        if (!$user) {
            Log::error('User not found', ['email' => $customerEmail, 'order_id' => $orderId]);
            return response('OK', 200);
        }

        if ($tiers->empty()) {
            Log::error('Tiers not found', ['tier_ids' => $tierIds, 'order_id' => $orderId]);
            return response('OK', 200);
        }

        try {
            DB::transaction(function () use ($user, $tiers, $orderId) {

                $tiers->each(function ($tier) use ($user, $orderId) {

                    $current = $user->tiers()->find($tier->id);

                    if (! $current) {
                        $expires = now()->addYear();
                    } else {
                        $end = Carbon::parse($current->pivot->expires_at);
                        $expires = $end->isFuture()
                            ? $end->addYear()
                            : now()->addYear();
                    }

                    $user->tiers()->syncWithoutDetaching([
                        $tier->id => ['expires_at' => $expires],
                    ]);

                    Log::info('Subscription processed successfully', [
                        'email' => $user->email,
                        'order_id' => $orderId,
                        'plan' => $tier->name
                    ]);
                });

            });

            return response('OK', 200);
        } catch (\Exception $e) {
            Log::error('Failed to process subscription', [
                'error' => $e->getMessage(),
                'order_id' => $orderId,
                'email' => $customerEmail
            ]);

            // Return 200 to prevent Prodamus from retrying
            return response('OK', 200);
        }
    }

    private function sign($data)
    {
        unset($data['signature']);
        array_walk_recursive($data, fn(&$v) => $v = (string)$v);
        $this->ksortRecursive($data);
        $json = str_replace('/', '\/', json_encode($data, JSON_UNESCAPED_UNICODE));
        return hash_hmac('sha256', $json, config('prodamus.key'));
    }

    private function verify($data, $signature)
    {
        return hash_equals($this->sign($data), $signature);
    }

    private function ksortRecursive(&$array)
    {
        ksort($array);
        foreach ($array as &$value) {
            if (is_array($value)) {
                $this->ksortRecursive($value);
            }
        }
    }

    public function success()
    {
        return Inertia::render('user/Payment/Payment');
    }
}
