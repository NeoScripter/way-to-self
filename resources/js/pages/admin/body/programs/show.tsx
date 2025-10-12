import BlockUpsert from '@/components/admin/molecules/block-upsert';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import ExpandablePanel from '@/components/admin/molecules/expandable-panel';
import ItemPicker, { Option } from '@/components/admin/molecules/item-picker';
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
                    routeName={route(`admin.body.programs.update`, program.id)}
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
                    routeName={route('admin.body.blocks.store', program.id)}
                />
            </ExpandablePanel>
            {program.blocks?.map((block, idx) => (
                <ExpandablePanel
                    key={block.id}
                    label={`Блок ${idx + 1}`}
                >
                    <BlockEntry
                        block={block}
                        onClick={() => setSelectedBlock(block)}
                    />
                </ExpandablePanel>
            ))}

            {selectedBlock != null && (
                <ConfirmationDialog
                    show={selectedBlock != null}
                    closeDialog={() => setSelectedBlock(null)}
                    title="Вы точно уверены, что хотите удалить данный блок?"
                    routeName={route(`admin.body.blocks.destroy`, selectedBlock)}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </EditingLayout>
    );
}

type BlockEntryProps = {
    block: ProgramBlock;
    onClick: () => void;
};

function BlockEntry({ block, onClick }: BlockEntryProps) {
    let { options } = usePage<{ options: Option[] }>().props;

    const selected = block?.exercises?.map((e) => {
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
            <BlockUpsert
                routeName={route('admin.body.blocks.update', block.id)}
                block={block}
                onClick={onClick}
            />

            {block.exercises && (
                <ItemPicker
                    label="Выбор упражнения"
                    placeholder="Название упражнения"
                    onAdd="admin.body.exercise.toggle"
                    onRemove="admin.body.exercise.toggle"
                    selected={selected ?? []}
                    options={options}
                    payload={{ block_id: [block.id] }}
                />
            )}
        </div>
    );
}
