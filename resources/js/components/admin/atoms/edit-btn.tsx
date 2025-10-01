import { Button } from "@headlessui/react";

type EditBtnProps = {
    onClick: () => void;
    disabled?: boolean;
    isEdited: boolean;
};

export default function EditBtn({onClick, disabled = false, isEdited}: EditBtnProps) {
    return (
        <Button
            type="button"
            onClick={onClick}
            className="order-2 cursor-pointer rounded-lg px-6 py-3 text-sm sm:order-0 sm:text-base"
            disabled={disabled}
        >
            {isEdited ? 'Отменить' : 'Редактировать'}
        </Button>
    );
}
