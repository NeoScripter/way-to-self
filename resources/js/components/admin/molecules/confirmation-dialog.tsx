import NeutralBtn from '@/components/shared/atoms/neutral-btn';
import DialogLayout from '@/components/user/molecules/dialog-layout';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';

type ConfirmationDialogProps = {
    className?: string;
    closeDialog: () => void;
    show: boolean;
    title: string;
    description?: string;
    routeName: string;
    methodName: 'delete' | 'post' | 'patch';
    confirmBtnLabel: string;
    cancelBtnLabel: string;
    payload?: Record<string, any>;
};
export default function ConfirmationDialog({
    className,
    closeDialog,
    show,
    title,
    description,
    routeName,
    methodName,
    confirmBtnLabel,
    cancelBtnLabel,
    payload,
}: ConfirmationDialogProps) {
    const handleClick = () => {
        router.visit(routeName, {
            method: methodName,
            preserveScroll: true,
            onSuccess: () => closeModal(),
            data: payload ? { ...payload } : {},
        });
    };

    const closeModal = () => {
        closeDialog();
    };

    return (
        <DialogLayout
            show={show}
            onClose={closeDialog}
            showBtn={false}
        >
            <div
                className={cn(
                    'mx-auto max-w-150 space-y-6 rounded-[4rem] border-2 border-white/20 bg-card-backdrop-gray px-6 pt-11 pb-12.5 text-center backdrop-blur-sm sm:px-12',
                    className,
                )}
            >
                <p className="font-semibold text-balance sm:text-2xl">
                    {title}
                </p>
                {description && <p className="text-lg"> {description}</p>}

                <div className="flex items-center gap-4 sm:gap-10">
                    <NeutralBtn
                        onClick={handleClick}
                        key={'confirm-btn'}
                        className="flex-1 border border-white bg-red-purple hover:bg-red-700"
                        type="submit"
                    >
                        {confirmBtnLabel}
                    </NeutralBtn>

                    <NeutralBtn
                        key={'cancel-btn'}
                        className="flex-1 border border-white"
                        onClick={closeModal}
                        type="button"
                    >
                        {cancelBtnLabel}
                    </NeutralBtn>
                </div>
            </div>
        </DialogLayout>
    );
}
