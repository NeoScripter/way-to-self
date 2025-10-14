type HomepageEntryProps = {
    block: ProgramHomepage;
    onClick: () => void;
};

function HomepageEntry({ block, onClick }: HomepageEntryProps) {
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
            <HomepageUpsert
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
