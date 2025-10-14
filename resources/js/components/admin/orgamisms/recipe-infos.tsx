import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import ExpandablePanel from '@/components/admin/molecules/expandable-panel';
import RecipeInfoUpsert from '@/components/admin/molecules/recipe-info-upsert';
import { RecipeInfo } from '@/types/model';
import { useState } from 'react';

type RecipeInfosProps = {
    infos: RecipeInfo[] | undefined;
    recipeId: number;
};

export default function RecipeInfos({ infos, recipeId }: RecipeInfosProps) {
    const [selectedInfo, setSelectedInfo] = useState<RecipeInfo | null>(null);

    return (
        <>
            {' '}
            <h3 className="text-lg font-bold uppercase sm:text-xl">
                Информация (блок справа)
            </h3>
            <ExpandablePanel
                key="create-info-form"
                label="Создать новый блок"
            >
                <RecipeInfoUpsert
                    order={infos?.length ?? 0}
                    routeName={route('admin.nutrition.infos.store', recipeId)}
                />
            </ExpandablePanel>
            {infos?.map((info, idx) => (
                <ExpandablePanel
                    key={info.id}
                    label={`Блок ${idx + 1}`}
                >
                    <RecipeInfoUpsert
                        info={info}
                        routeName={route(
                            'admin.nutrition.infos.update',
                            info.id,
                        )}
                        onClick={() => setSelectedInfo(info)}
                    />
                </ExpandablePanel>
            ))}
            {selectedInfo != null && (
                <ConfirmationDialog
                    show={selectedInfo != null}
                    closeDialog={() => setSelectedInfo(null)}
                    title="Вы точно уверены, что хотите удалить данный блок?"
                    routeName={route(
                        `admin.nutrition.infos.destroy`,
                        selectedInfo,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </>
    );
}
