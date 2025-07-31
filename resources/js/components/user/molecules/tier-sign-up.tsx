import { cn } from '@/lib/utils';
import CheckboxInput from '../atoms/checkbox-input';
import InputField from '../atoms/input-field';

type TierSignUpProps = {
    className?: string;
    userName: string;
    email: string;
    telegram: string;
    agreedData: boolean;
    agreedPolicy: boolean;
    changeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changeTelegram: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setAgreedData: ((checked: boolean) => void) | undefined;
    setAgreedPolicy: ((checked: boolean) => void) | undefined;
};

export default function TierSignUp({
    className,
    userName,
    email,
    telegram,
    agreedData,
    agreedPolicy,
    changeName,
    changeEmail,
    changeTelegram,
    setAgreedData,
    setAgreedPolicy,
}: TierSignUpProps) {
    return (
        <form
            className={cn(
                'max-w-85 rounded-3xl border-2 border-white/20 bg-card-backdrop-gray/50 px-7 py-12 backdrop-blur-sm sm:w-full sm:max-w-182 sm:rounded-[3rem] sm:px-10 xl:max-w-210',
                className,
            )}
        >
            <h2 className="mb-6 font-heading text-2xl font-medium sm:mb-8 sm:text-4xl md:mb-10 md:text-5xl">
                Данные для создания личного кабинета
            </h2>

            <div className="space-y-5 md:space-y-6">
                <InputField
                    label="Ваше имя"
                    value={userName}
                    placeholder="Ваше имя*"
                    onChange={changeName}
                />

                <InputField
                    label="Ваш ник в телеграм"
                    value={telegram}
                    placeholder="Ваш ник в телеграм*"
                    onChange={changeTelegram}
                />

                <InputField
                    label="Ваш Email"
                    value={email}
                    placeholder="Ваш Email*"
                    onChange={changeEmail}
                />
            </div>

            <div className="space-y-2 md:space-y-4 text-sm px-2 md:px-4 mt-6 sm:mt-8 md:text-base md:mt-10">
                <CheckboxInput
                    checked={agreedData}
                    onChange={setAgreedData}
                    checkboxClassName="size-7"
                >
                    Даю согласие на обработку персональных данных
                </CheckboxInput>

                <CheckboxInput
                    checked={agreedPolicy}
                    onChange={setAgreedPolicy}
                    checkboxClassName="size-7"
                >
                    Принимаю политику конфиденциальности{' '}
                </CheckboxInput>
            </div>
        </form>
    );
}
