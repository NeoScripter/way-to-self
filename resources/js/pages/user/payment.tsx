import PrimaryBtn from '@/components/user/atoms/primary-btn';
import UserLayout from '@/layouts/user/user-layout';

type PaymentProps = {
    status: 'success' | 'failure';
};
export default function Payment({ status }: PaymentProps) {
    const heading =
        status === 'success' ? 'Поздравляем! Вы успешно оформили подписку' : '';
    const body =
        status === 'success'
            ? 'Спасибо за покупку доступа к нашим курсам! Надеюсь, вы откроете для себя много полезного и они принесут вам много пользы. Временнный пароль для входа в личный кабинет выслан на указанную вами почту при регистрации. Если по какой-либо причине вы не получили письмо, проверьте папку спам. Если оно совсем не пришло, воспользуйтесь функцией восстановления пароля путем нажатия кнопки "забыли пароль" на странице входа в аккаунт и следуйте последующим инструкциям для восстановления пароля.'
            : '';

    return (
        <UserLayout
            layoutClass="bg-light-bg"
            pageClass="p-3 py-8 md:p-11 xl:p-25"
            headerClass="bg-light-swamp"
        >
            <article className="mx-auto prose prose-sm max-w-330 space-y-3 rounded-4xl bg-white px-10 py-4 prose-neutral md:prose-base md:space-y-12 md:px-16 xl:prose-xl xl:space-y-14">
                <h1 className="mt-6 text-center font-heading text-2xl font-medium text-balance text-text-black uppercase md:mt-14 md:text-5xl xl:mt-20 xl:text-6xl">
                    {heading}
                </h1>

                <div className="">{body}</div>

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

                    <h2 className="font-medium">admin@gmail.com</h2>
                </div>
            </article>
        </UserLayout>
    );
}
