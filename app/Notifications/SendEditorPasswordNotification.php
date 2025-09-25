<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendEditorPasswordNotification extends Notification
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
            ->subject('Пароль от вашего аккаунта')
            ->greeting('Здравствуйте, ' . $notifiable->name)
            ->line('Вы успешно зарегистрированы в качестве редактора сайта. Вот ваши учетные данные для входа:')
            ->line('Ваш новый пароль: ' . $this->password)
            ->line('Важно: смените пароль после первого входа, никогда не сообщайте его другим людям и удалите это письмо после сохранения пароля.')
            ->line('Теперь вы можете войти в свой аккаунт, используя адрес электронной почты и указанный выше пароль.')
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
