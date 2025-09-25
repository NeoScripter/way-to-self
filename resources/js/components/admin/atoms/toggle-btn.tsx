import { cn } from '@/lib/utils';
import { Field, Label, Switch } from '@headlessui/react';
import { router } from '@inertiajs/react';
import ConfirmationDialog from '../molecules/confirmation-dialog';
import useToggle from '@/hooks/use-toggle';

type ToggleBtnProps = {
    color?: string;
    className?: string;
    checked: boolean;
    routeName: string;
    notification?: string;
    label: string;
};

export default function ToggleBtn({
    className,
    color,
    checked,
    routeName,
    notification,
    label,
}: ToggleBtnProps) {

    const [showModal, toggleModal] = useToggle(false);

    function handleChange() {
        if (checked) {
            router.post(routeName);
        } else {
            toggleModal(true);
        }
    }

    return (
        <>
            <Field className={cn('flex items-center gap-6', className)}>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    className={cn(
                        'group inline-flex h-8 w-16 items-center rounded-full bg-gray-200 transition',
                        color,
                    )}
                >
                    <span className="size-6 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-9" />
                </Switch>
                <Label className="text-sm font-medium sm:text-base">
                    {label}
                </Label>
            </Field>

            <ConfirmationDialog
                show={showModal}
                closeDialog={() => toggleModal(false)}
                title="Вы точно уверены, что хотите заблокировать данного пользователя?"
                description="После блокировки пользователь не сможет больше войти в аккаунт"
                routeName={routeName}
                methodName="post"
                confirmBtnLabel='Заблокировать'
                cancelBtnLabel='Отмена'
            />
        </>
    );
}
