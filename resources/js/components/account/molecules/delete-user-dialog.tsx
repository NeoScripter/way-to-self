import InputError from '@/components/user/atoms/input-error';
import { Label } from '@/components/user/atoms/label';
import NeutralBtn from '@/components/user/atoms/neutral-btn';
import PasswordInput from '@/components/user/atoms/password-input';
import DialogLayout from '@/components/user/molecules/dialog-layout';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import z from 'zod';

type DeleteUserDialogProps = {
    className?: string;
    closeDialog: () => void;
    show: boolean;
};
type DeleteUserForm = {
    password: string;
};

export const schema = z.object({
    password: z
        .string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .max(100, 'Пароль не должен превышать 100 символов'),
});

export default function DeleteUserDialog({
    className,
    closeDialog,
    show,
}: DeleteUserDialogProps) {
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
        setError,
    } = useForm<Required<{ password: string }>>({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        const result = schema.safeParse(data);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            const inertiaErrors: Record<keyof DeleteUserForm, string> = {
                password: fieldErrors.password?.[0] ?? '',
            };

            setError(inertiaErrors);
            return;
        }

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        closeDialog();
        reset();
    };

    return (
        <DialogLayout
            show={show}
            onClose={closeDialog}
            showBtn={false}
        >
            <div className="mx-auto max-w-150 space-y-3 rounded-[4rem] border-2 border-white/20 bg-card-backdrop-gray px-12 pt-11 pb-12.5 text-center backdrop-blur-sm">
                <p className="text-2xl font-semibold text-balance">
                    Вы точно уверены, что хотите удалить свой аккаунт?
                </p>
                <p className="text-lg">
                    {' '}
                    Пожалуйста, введите пароль, чтобы подтвердить окончательное
                    удаление аккаунта.
                </p>
                <form
                    className={cn('space-y-8', className)}
                    onSubmit={deleteUser}
                >
                    <div className="grid gap-2 pt-2">
                        <Label
                            htmlFor="delete-password"
                            className="sr-only"
                        >
                            Пароль
                        </Label>

                        <PasswordInput
                            id="delete-password"
                            name="delete-password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Пароль"
                            className="text-text-black"
                            autoComplete="current-password"
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center gap-10">
                        <NeutralBtn
                            className="flex-1 border border-white bg-red-purple hover:bg-red-700"
                            disabled={processing}
                            type="submit"
                        >
                            Удалить
                        </NeutralBtn>

                        <NeutralBtn
                            className="flex-1 border border-white"
                            onClick={closeModal}
                            type="button"
                        >
                            Не удалять
                        </NeutralBtn>
                    </div>
                </form>
            </div>
        </DialogLayout>
    );
}
