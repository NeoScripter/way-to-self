<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Your Account Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #394A31;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #B7C299;
            padding: 30px;
            border: 1px solid #dee2e6;
        }
        .password-box {
            background-color: #f8f9fa;
            border: 2px dashed #6c757d;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            border-radius: 8px;
        }
        .password {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            font-family: monospace;
            letter-spacing: 2px;
        }
        .footer {
            background-color: #394A31;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #fff;
            border-radius: 0 0 8px 8px;
        }
        .warning {
            background-color: rgba(36, 58, 32, 0.62);;
            border: 1px solid rgba(255,255,255,20);
            color: #fff;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Добро пожаловать на нашу платформу!</h1>
    </div>

    <div class="content">
        <h2>Ваш аккаунт был создан</h2>

        <p>Спасибо за регистрацию! Ваш аккаунт успешно создан, и ваш платеж был обработан.</p>

        <p>Вот ваши учетные данные для входа:</p>

        <div class="password-box">
            <p><strong>Ваш пароль:</strong></p>
            <div class="password">{{ $password }}</div>
        </div>

        <div class="warning">
            <strong>Важное уведомление о безопасности:</strong>
            <ul>
                <li>Сохраните этот пароль в надежном месте</li>
                <li>Мы рекомендуем сменить пароль после первого входа</li>
                <li>Никогда не сообщайте свой пароль другим людям</li>
                <li>Это письмо содержит конфиденциальную информацию — удалите его после сохранения пароля</li>
            </ul>
        </div>

        <p>Теперь вы можете войти в свой аккаунт, используя адрес электронной почты и указанный выше пароль.</p>

        <p>Если у вас возникнут вопросы или потребуется помощь, пожалуйста, свяжитесь с нашей службой поддержки.</p>

        <p>Добро пожаловать!</p>
    </div>

    <div class="footer">
        <p>Это автоматическое сообщение. Пожалуйста, не отвечайте на это письмо.</p>
        <p>&copy; {{ date('Y') }} Мария Юданова. Все права защищены.</p>
    </div>
</body>
</html>

