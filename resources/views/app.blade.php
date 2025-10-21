<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="overflow-x-clip">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="author" content="Мария Юданова">

    <!-- Description -->
    <meta name="description"
        content="Портал о том, как улучшить или поддерживать свое здоровье и наслаждаться жизнью в полной мере.">

    <!-- Keywords -->
    <meta name="keywords"
        content="здоровье, здоровый образ жизни, правильное питание, фитнес, йога, медитация, психология, ментальное здоровье, уход за собой, долголетие, советы по здоровью, активная жизнь, профилактика болезней, здоровье тела и разума, баланс, благополучие, энергия, позитивное мышление, мотивация, самосовершенствование">

    <!-- Robots -->
    <meta name="robots" content="index, follow">

    <meta property="og:title" content="Время впять, путь к себе">
    <meta property="og:description"
        content="Портал о том, как улучшить или поддерживать свое здоровье и наслаждаться жизнью в полной мере.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ asset('meta/og.png') }}">
    <meta property="og:site_name" content="Время впять, путь к себе">
    <meta property="og:locale" content="ru_RU">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Время впять, путь к себе">
    <meta name="twitter:description"
        content="Портал о том, как улучшить или поддерживать свое здоровье и наслаждаться жизнью в полной мере.">
    <meta name="twitter:image" content="{{ asset('meta/twitter.png') }}">

    <!-- Mobile-Specific -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Время впять, путь к себе">
    <meta name="mobile-web-app-capable" content="yes">

    <!-- Favicon and Icons -->
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">

    <link rel="canonical" href="{{ url()->current() }}">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preload" href="{{ asset('fonts/DisruptorsScript-Regular.woff2') }}" as="font" type="font/woff2"
        crossorigin>
    <link rel="preload" href="{{ asset('fonts/BodoniFLF-Roman.woff2') }}" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="{{ asset('fonts/Inter18pt-Bold.woff2') }}" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="{{ asset('fonts/Inter18pt-Medium.woff2') }}" as="font" type="font/woff2"
        crossorigin>
    <link rel="preload" href="{{ asset('fonts/Inter18pt-Regular.woff2') }}" as="font" type="font/woff2"
        crossorigin>

    <style>
        @font-face {
            font-family: Inter;
            src: url('/fonts/Inter18pt-Bold.woff2') format('woff2'), url('/fonts/Inter18pt-Bold.woff') format('woff');
            font-weight: 700;
            font-display: swap
        }

        @font-face {
            font-family: Inter;
            src: url('/fonts/Inter18pt-Medium.woff2') format('woff2'), url('/fonts/Inter18pt-Medium.woff') format('woff');
            font-weight: 500;
            font-display: swap
        }

        @font-face {
            font-family: Inter;
            src: url('/fonts/Inter18pt-Regular.woff2') format('woff2'), url('/fonts/Inter18pt-Regular.woff') format('woff');
            font-weight: 400;
            font-display: swap
        }

        @font-face {
            font-family: 'Disruptors Script';
            src: url('/fonts/DisruptorsScript-Regular.woff2') format('woff2'), url('/fonts/DisruptorsScript-Regular.woff') format('woff');
            font-display: swap
        }

        @font-face {
            font-family: Bodoni;
            src: url('/fonts/BodoniFLF-Roman.woff2') format('woff2'), url('/fonts/BodoniFLF-Roman.woff') format('woff');
            font-display: swap
        }
    </style>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body scroll-region class="font-inter overflow-x-clip antialiased min-h-screen max-w-480 mx-auto">
    @inertia

    <div id="portal-container"></div>
</body>

</html>
