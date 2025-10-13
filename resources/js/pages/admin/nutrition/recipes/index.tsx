import TrashBtn from '@/components/admin/atoms/trash-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import LazyImage from '@/components/user/atoms/lazy-image';
import AdminLayout from '@/layouts/admin/admin-layout';
import pluralizeRu from '@/lib/helpers/pluralize';
import { shortenDescription } from '@/lib/helpers/shortenDescription';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { Recipe } from '@/types/model';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { nutritionMenuItems } from '../nutrition-menu-items';

export default function Index() {
    const { recipes, count } = usePage<{
        recipes: PaginationMeta<Recipe>;
        count: number;
        namespace: string;
    }>().props;

    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(
        null,
    );

    const badge = pluralizeRu(count, 'рецепта', 'рецепта', 'рецептов');

    return (
        <AdminLayout topMenuItems={nutritionMenuItems}>
            <TableHeader
                only={['recipes']}
                label={'все рецепты'}
                badge={`${count} ${badge}`}
                createRoute={route(`admin.body.recipes.create`)}
            />
            <Table
                meta={recipes}
                width="min-w-150 sm:min-w-180 lg:min-w-220 space-y-8"
                columns={['Фото', 'Заголовок', 'Краткое описание', '']}
                isEmpty={recipes.data.length === 0}
                columnClass="!text-center"
            >
                {recipes.data.map((recipe) => (
                    <RecipeItem
                        key={recipe.id}
                        recipe={recipe}
                        onClick={() => setSelectedRecipe(recipe)}
                    />
                ))}
            </Table>

            {selectedRecipe != null && (
                <ConfirmationDialog
                    show={selectedRecipe != null}
                    closeDialog={() => setSelectedRecipe(null)}
                    title="Вы точно уверены, что хотите удалить данный рецепт?"
                    routeName={route(
                        `admin.body.recipes.destroy`,
                        selectedRecipe,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </AdminLayout>
    );
}

type RecipeItemProps = {
    recipe: Recipe;
    onClick: () => void;
};

function RecipeItem({ recipe, onClick }: RecipeItemProps) {
    return (
        <div
            className={cn(
                'relative grid grid-cols-4 gap-2 text-center text-text-black md:justify-between',
            )}
        >
            <Link
                href={route(`admin.body.recipes.show`, recipe.id)}
                className="transition-scale block cursor-pointer duration-200 hover:scale-105"
                as="button"
            >
                {recipe.image && (
                    <LazyImage
                        parentClass="max-w-25 mx-auto"
                        img={recipe.image.path}
                        tinyImg={recipe.image.tiny_path}
                        alt={recipe.image.alt}
                    />
                )}
            </Link>

            <span className="pt-4 font-semibold">{recipe.title}</span>
            <span className="">{shortenDescription(recipe.description)}</span>
            <div className="flex items-center justify-end gap-2">
                <Link
                    href={route(`admin.body.recipes.show`, recipe.id)}
                    className="ease cursor-pointer text-dark-green transition-colors duration-200 hover:text-light-swamp"
                    as="button"
                >
                    <PencilIcon className="size-6" />
                </Link>
                <TrashBtn
                    onClick={onClick}
                    size="size-7"
                />
            </div>
        </div>
    );
}
