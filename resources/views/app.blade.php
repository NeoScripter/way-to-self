<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="overflow-x-clip">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preload" href="{{ asset('fonts/DisruptorsScript-Regular.woff2') }}" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="{{ asset('fonts/BodoniFLF-Roman.woff2') }}" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="{{ asset('fonts/Inter18pt-Bold.woff2') }}" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="{{ asset('fonts/Inter18pt-Medium.woff2') }}" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="{{ asset('fonts/Inter18pt-Regular.woff2') }}" as="font" type="font/woff2" crossorigin>

        <style>
            @font-face{font-family:Inter;src:url('/fonts/Inter18pt-Bold.woff2') format('woff2'),url('/fonts/Inter18pt-Bold.woff') format('woff');font-weight:700;font-display:swap}@font-face{font-family:Inter;src:url('/fonts/Inter18pt-Medium.woff2') format('woff2'),url('/fonts/Inter18pt-Medium.woff') format('woff');font-weight:500;font-display:swap}@font-face{font-family:Inter;src:url('/fonts/Inter18pt-Regular.woff2') format('woff2'),url('/fonts/Inter18pt-Regular.woff') format('woff');font-weight:400;font-display:swap}@font-face{font-family:'Disruptors Script';src:url('/fonts/DisruptorsScript-Regular.woff2') format('woff2'),url('/fonts/DisruptorsScript-Regular.woff') format('woff');font-display:swap}@font-face{font-family:Bodoni;src:url('/fonts/BodoniFLF-Roman.woff2') format('woff2'),url('/fonts/BodoniFLF-Roman.woff') format('woff');font-display:swap}
        </style>

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body scroll-region class="font-inter overflow-x-clip antialiased min-h-screen max-w-480 mx-auto">
        @inertia
    </body>
</html>
