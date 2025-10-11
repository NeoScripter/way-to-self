import BlockUpsert from '@/components/admin/molecules/block-upsert';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import ExpandablePanel from '@/components/admin/molecules/expandable-panel';
import GridItemPicker from '@/components/admin/molecules/grid-item-picker';
import ProgramUpsert from '@/components/admin/molecules/program-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';
import { Program, ProgramBlock } from '@/types/model';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Show() {
    const { program } = usePage<{
        program: Program;
    }>().props;

    const [selectedBlock, setSelectedBlock] = useState<ProgramBlock | null>(
        null,
    );

    return (
        <EditingLayout
            pageClass="space-y-6 sm:space-y-8"
            navKey="programs"
        >
            <ExpandablePanel
                key={'program-upsert'}
                label="Редактировать программу"
            >
                <ProgramUpsert
                    program={program}
                    routeName={route(`admin.programs.update`, program.id)}
                />
            </ExpandablePanel>

            <h3 className="text-lg font-bold uppercase sm:text-xl">
                Блоки упражнений
            </h3>

            <ExpandablePanel
                key="create-block-form"
                label="Создать новый блок"
            >
                <BlockUpsert
                    routeName={route('admin.blocks.store', program.id)}
                />
            </ExpandablePanel>
            {program.blocks?.map((block, idx) => (
                <ExpandablePanel
                    key={block.id}
                    label={`Блок ${idx + 1}`}
                >
                    <BlockUpsert
                        routeName={route('admin.blocks.update', block.id)}
                        block={block}
                        onClick={() => setSelectedBlock(block)}
                    />

                    {block.exercises && (
                        <GridItemPicker
                            gridItems={block.exercises}
                            items={block.exercises}
                        />
                    )}
                </ExpandablePanel>
            ))}

            {selectedBlock != null && (
                <ConfirmationDialog
                    show={selectedBlock != null}
                    closeDialog={() => setSelectedBlock(null)}
                    title="Вы точно уверены, что хотите удалить данный блок?"
                    routeName={route(`admin.blocks.destroy`, selectedBlock)}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </EditingLayout>
    );
}
