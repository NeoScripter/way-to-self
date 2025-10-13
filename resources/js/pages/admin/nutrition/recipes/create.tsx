import RecipeUpsert from '@/components/admin/molecules/recipe-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';

export default function Create() {

    return (
        <EditingLayout
            navKey="recipes"
            title="Создать рецепт"
        >
            <RecipeUpsert routeName={route(`admin.nutrition.recipes.store`)} />
        </EditingLayout>
    );
}
