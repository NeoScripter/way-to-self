<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\VisitorLog;
use Symfony\Component\HttpFoundation\Response;

class LogVisitor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->isMethod('get')) {
            return $next($request);
        }

        $ipAddress = $request->ip();
        $today = now()->toDateString();

        $exists = VisitorLog::where('ip_address', $ipAddress)
            ->where('visited_date', $today)
            ->exists();

        if (!$exists) {
            VisitorLog::create([
                'ip_address'   => $ipAddress,
                'url'          => $request->fullUrl(),
                'visited_date' => $today,
                'visited_at'   => now(),
            ]);
        }

        return $next($request);
    }
}
