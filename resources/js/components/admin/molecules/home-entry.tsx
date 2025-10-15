import ItemPicker, { Option } from '@/components/admin/molecules/item-picker';
import { HomeEntry as HomeEntryType } from '@/types/model';
import { usePage } from '@inertiajs/react';
import HomeUpsert from './home-upsert';

type Item = {
    id: number;
    image: string | undefined;
    title: string;
    description: string;
};

export default function HomeEntry() {
    let {
        options,
        selected,
        namespace,
        item = 'елемента',
        entry,
    } = usePage<{
        options: Option[];
        selected: Item[];
        namespace: string;
        item?: string;
        entry: HomeEntryType;
    }>().props;

    return (
        <div>
            <HomeUpsert
                routeName={route('admin.home.entry.update', entry.id)}
                entry={entry}
            />

            <ItemPicker
                label={`Выбор ${item}`}
                placeholder={`Название ${item}`}
                onAdd={`admin.home.${namespace}.update`}
                onRemove={`admin.home.${namespace}.update`}
                selected={selected ?? []}
                options={options}
            />
        </div>
    );
}
