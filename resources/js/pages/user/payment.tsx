import PrimaryBtn from '@/components/user/atoms/primary-btn';
import AppLayout from '@/layouts/user/app-layout';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

type PaymentProps = {
    status: 'success' | 'failure';
    adminEmail: string;
};
export default function Payment({ status, adminEmail }: PaymentProps) {
    const heading =
        status === 'success' ? 'Поздравляем! Вы успешно оформили подписку' : '';
    const body =
        status === 'success'
            ? '<p>Благодарим Вас за приобретение доступа к нашей платформе!</p><p>Уверены, вы обнаружите для себя множество ценных сведений, упражнений, практик, рецептов и массу другой информации, которая для вас будет полезна.</p><p>Временнный пароль для входа в личный кабинет выслан на указанную вами почту при регистрации. Если по какой-либо причине вы не получили письмо, проверьте папку спам. Если оно совсем не пришло, воспользуйтесь функцией восстановления пароля путем нажатия кнопки "забыли пароль" на странице входа в аккаунт и следуйте последующим инструкциям для восстановления пароля.для входа в личный кабинет выслан на указанную вами почту при регистрации.</p>'
            : '<p>К сожалению, попытка оплатить подписку оказалась неудачной.</p><p>Возможно, произошел сбой при транзакции, либо на карте недостаточно средств. Для получения доступа к разделу зайдите в личный кабинет, введя свой логин и пароль, затем перейдите в корзину и попробуйте повторно произвести оплату. В случае повторной неудачи, свяжитесь пожалуйста с администратором сайта по указанной электронной почте внизу страницы.</p><p>Временнный пароль для входа в личный кабинет выслан на указанную вами почту при регистрации. Если по какой-либо причине вы не получили письмо, проверьте папку спам. Если оно совсем не пришло, воспользуйтесь функцией восстановления пароля путем нажатия кнопки "забыли пароль" на странице входа в аккаунт и следуйте последующим инструкциям для восстановления пароля.для входа в личный кабинет выслан на указанную вами почту при регистрации.</p>';

    useEffect(() => {
        if (status === 'success') {
            confetti({
                particleCount: 800,
                spread: 250,
                ticks: 300,
            });
        }
    }, []);

    return (
        <AppLayout
            variant="guest"
            layoutClass="bg-light-bg"
            pageClass="p-3 py-8 md:p-11 xl:p-25"
            headerClass="bg-light-swamp"
        >
            <article className="mx-auto prose prose-sm max-w-330 space-y-3 rounded-4xl bg-white px-10 py-4 text-center text-pretty prose-neutral md:prose-base md:space-y-12 md:px-16 xl:prose-xl xl:space-y-14">
                <h1 className="mt-6 text-center font-heading text-2xl font-medium text-balance text-text-black uppercase md:mt-14 md:text-5xl xl:mt-20 xl:text-6xl">
                    {heading}
                </h1>

                <div dangerouslySetInnerHTML={{ __html: body }} />

                <PrimaryBtn
                    href={route('home')}
                    className="mx-auto my-6 md:mb-10 xl:mb-14"
                >
                    На главную
                </PrimaryBtn>

                <div className="mb-8 text-center text-balance md:mb-10 xl:mb-16">
                    <p>
                        Если со входом или оплатой возникли проблемы,
                        пожалуйста, обратитесь к администратору:
                    </p>

                    <h2 className="font-medium">{adminEmail}</h2>
                </div>
            </article>
        </AppLayout>
    );
}
