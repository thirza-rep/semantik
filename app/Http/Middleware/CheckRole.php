<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!$request->user()) {
            return redirect()->route('login');
        }

        $userRole = $request->user()->role;

        if (!in_array($userRole, $roles)) {
            // Redirect to appropriate dashboard based on user's role
            return match ($userRole) {
                'admin' => redirect()->route('admin.dashboard'),
                'dosen' => redirect()->route('dosen.dashboard'),
                'mahasiswa' => redirect()->route('mahasiswa.dashboard'),
                default => redirect()->route('login'),
            };
        }

        return $next($request);
    }
}
