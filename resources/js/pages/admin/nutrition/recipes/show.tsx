import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import ExpandablePanel from '@/components/admin/molecules/expandable-panel';
import RecipeInfoUpsert from '@/components/admin/molecules/recipe-info-upsert';
import RecipeUpsert from '@/components/admin/molecules/recipe-upsert';
import RecipeInfos from '@/components/admin/orgamisms/recipe-infos';
import RecipeSteps from '@/components/admin/orgamisms/recipe-steps';
import EditingLayout from '@/layouts/admin/editing-layout';
import { Recipe, RecipeInfo } from '@/types/model';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Show() {
    const { recipe } = usePage<{
        recipe: Recipe;
    }>().props;

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

            <RecipeInfos
                key={'recipe-infos'}
                infos={recipe.infos}
                recipeId={recipe.id}
            />

            <RecipeSteps
                key={'recipe-steps'}
                steps={recipe.steps}
                recipeId={recipe.id}
            />
        </EditingLayout>
    );
}

