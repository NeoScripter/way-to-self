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

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="preload" href="{{ asset('fonts/RWmMoKWR9v4ksMfaWd_JN9XBiaQ6DQ.woff2') }}" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="{{ asset('fonts/RWmMoKWR9v4ksMfaWd_JN9XFiaQ.woff2') }}" as="font" type="font/woff2" crossorigin>

    <link rel="preload" href="{{ asset('fonts/BodoniFLF-Roman.woff2') }}" as="font" type="font/woff2" crossorigin>

    <link rel="preload" href="{{ asset('fonts/RWmMoKWR9v4ksMfaWd_JN9XBiaQ6DQ.woff2') }}" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="{{ asset('fonts/UcCo3FwrK3iLTcvmYwYL8g.woff2') }}" as="font" type="font/woff2" crossorigin>

    <style>
        @font-face {
            font-family: 'Great Vibes';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/RWmMoKWR9v4ksMfaWd_JN9XBiaQ6DQ.woff2') format('woff2');
            unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        @font-face {
            font-family: 'Great Vibes';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/RWmMoKWR9v4ksMfaWd_JN9XFiaQ.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 100 900;
            font-display: swap;
            src: url('/fonts/UcCo3FwrK3iLTcvmYwYL8g.woff2') format('woff2');
            unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }

        @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 100 900;
            font-display: swap;
            src: url('/fonts/UcCo3FwrK3iLTcviYwY.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @font-face {
            font-family: Bodoni;
            src: url('/fonts/BodoniFLF-Roman.woff2') format('woff2');
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
