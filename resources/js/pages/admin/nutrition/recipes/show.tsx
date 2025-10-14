import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import ExpandablePanel from '@/components/admin/molecules/expandable-panel';
import ItemPicker, { Option } from '@/components/admin/molecules/item-picker';
import RecipeInfoUpsert from '@/components/admin/molecules/recipe-info-upsert';
import RecipeUpsert from '@/components/admin/molecules/recipe-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';
import { Recipe, RecipeInfo } from '@/types/model';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Show() {
    const { recipe } = usePage<{
        recipe: Recipe;
    }>().props;

    const [selectedBlock, setSelectedBlock] = useState<RecipeInfo | null>(null);

    return (
        <EditingLayout
            pageClass="space-y-6 sm:space-y-8"
            navKey="recipes"
        >
            <ExpandablePanel
                key={'recipe-upsert'}
                label="Редактировать рецепт"
            >
                <RecipeUpsert
                    recipe={recipe}
                    routeName={route(
                        `admin.nutrition.recipes.update`,
                        recipe.id,
                    )}
                />
            </ExpandablePanel>

            <h3 className="text-lg font-bold uppercase sm:text-xl">
                Информация (блок справа)
            </h3>

            <ExpandablePanel
                key="create-info-form"
                label="Создать новый блок"
            >
                <RecipeInfoUpsert
                    order={recipe.infos?.length ?? 0}
                    routeName={route('admin.nutrition.infos.store', recipe.id)}
                />
            </ExpandablePanel>
            {recipe.infos
                ?.sort((i1, i2) => i1.order - i2.order)
                .map((info, idx) => (
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
                            onClick={() => setSelectedBlock(info)}
                        />
                    </ExpandablePanel>
                ))}

            {selectedBlock != null && (
                <ConfirmationDialog
                    show={selectedBlock != null}
                    closeDialog={() => setSelectedBlock(null)}
                    title="Вы точно уверены, что хотите удалить данный блок?"
                    routeName={route(
                        `admin.nutrition.infos.destroy`,
                        selectedBlock,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </EditingLayout>
    );
}

type BlockEntryProps = {
    info: RecipeInfo;
    onClick: () => void;
};

function BlockEntry({ info, onClick }: BlockEntryProps) {
    let { options } = usePage<{ options: Option[] }>().props;

    const selected = info?.exercises?.map((e) => {
        return {
            id: e.id,
            image: e.image?.path,
            title: e.title,
            description: e.description,
        };
    });
    options = options.filter((o) => !selected?.find((e) => e.id === o.id));

    return (
        <div>
            <RecipeInfoUpsert
                routeName={route('admin.nutrition.infos.update', info.id)}
                info={info}
                onClick={onClick}
            />

            {info.exercises && (
                <ItemPicker
                    label="Выбор упражнения"
                    placeholder="Название упражнения"
                    onAdd="admin.nutrition.exercise.toggle"
                    onRemove="admin.nutrition.exercise.toggle"
                    selected={selected ?? []}
                    options={options}
                    payload={{ block_id: [info.id] }}
                />
            )}
        </div>
    );
}
