import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import ExpandablePanel from '@/components/admin/molecules/expandable-panel';
import { RecipeStep } from '@/types/model';
import { useState } from 'react';
import RecipeStepUpsert from '../molecules/recipe-step-upsert';

type RecipeStepsProps = {
    steps: RecipeStep[] | undefined;
    recipeId: number;
};

export default function RecipeSteps({ steps, recipeId }: RecipeStepsProps) {
    const [selectedStep, setSelectedStep] = useState<RecipeStep | null>(null);

    return (
        <>
            {' '}
            <h3 className="text-lg font-bold uppercase sm:text-xl">
                Шаги приготовления
            </h3>
            <ExpandablePanel
                key="create-step-form"
                label="Создать новый блок"
            >
                <RecipeStepUpsert
                    order={steps?.length ?? 0}
                    routeName={route('admin.nutrition.steps.store', recipeId)}
                />
            </ExpandablePanel>
            {steps?.map((step, idx) => (
                <ExpandablePanel
                    key={step.id}
                    label={`Блок ${idx + 1}`}
                >
                    <RecipeStepUpsert
                        step={step}
                        routeName={route(
                            'admin.nutrition.steps.update',
                            step.id,
                        )}
                        onClick={() => setSelectedStep(step)}
                    />
                </ExpandablePanel>
            ))}
            {selectedStep != null && (
                <ConfirmationDialog
                    show={selectedStep != null}
                    closeDialog={() => setSelectedStep(null)}
                    title="Вы точно уверены, что хотите удалить данный блок?"
                    routeName={route(
                        `admin.nutrition.steps.destroy`,
                        selectedStep,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </>
    );
}
