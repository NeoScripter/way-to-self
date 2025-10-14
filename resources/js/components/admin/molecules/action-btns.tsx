import EditBtn from '../atoms/edit-btn';
import NeutralBtn from '../atoms/neutral-btn';

type ActionBtnsProps = {
    isCreate?: boolean;
    edited: boolean;
    loading?: boolean;
    saved?: boolean;
    onDelete?: () => void;
    onCancel: () => void;
};

export function ActionBtns({
    isCreate,
    edited,
    loading,
    saved,
    onDelete,
    onCancel,
}: ActionBtnsProps) {
    return (
        <div className="flex flex-col flex-wrap items-center justify-center gap-2 sm:flex-row sm:gap-4">
            {!isCreate && (
                <EditBtn
                    onClick={onCancel}
                    disabled={loading}
                    isEdited={edited}
                />
            )}

            <NeutralBtn
                className="px-8 py-3 sm:px-12"
                disabled={loading || !edited}
            >
                {saved ? 'Сохранено' : 'Сохранить'}
            </NeutralBtn>

            {onDelete && (
                <NeutralBtn
                    onClick={onDelete}
                    className="bg-red-700 px-8 py-3 hover:bg-red-600 sm:px-12"
                    disabled={!(loading || !edited)}
                >
                    Удалить
                </NeutralBtn>
            )}
        </div>
    );
}
