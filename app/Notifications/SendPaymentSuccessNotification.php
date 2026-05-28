<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendPaymentSuccessNotification extends Notification
{
    use Queueable;
    protected string $password;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $password)
    {
        $this->password = $password;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Успешная оплата подписки')
            ->greeting('Здравствуйте, ' . $notifiable->name)
            ->line('Благодарим Вас за приобретение доступа к нашей платформе!')
            ->line('Уверены, вы обнаружите для себя множество ценных сведений, упражнений, практик, рецептов и массу другой информации, которая для вас будет полезна.')
            ->line('Временнный пароль для входа в личный кабинет выслан на указанную вами почту при регистрации. Если по какой-либо причине вы не получили письмо, проверьте папку спам. Если оно совсем не пришло, воспользуйтесь функцией восстановления пароля путем нажатия кнопки "забыли пароль" на странице входа в аккаунт и следуйте последующим инструкциям для восстановления пароля.для входа в личный кабинет выслан на указанную вами почту при регистрации.')
            ->line('Если у вас возникнут вопросы или потребуется помощь, пожалуйста, свяжитесь с нашей службой поддержки. Добро пожаловать!')
            ->action('В личный кабинет', url('/login'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
