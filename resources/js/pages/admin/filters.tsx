import LightBtn from '@/components/admin/atoms/light-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import FilterPanel from '@/components/admin/molecules/filter-panel';
import FilterUpsert from '@/components/admin/molecules/filter-upsert';
import useToggle from '@/hooks/use-toggle';
import { MenuItem } from '@/lib/data/account-menu-items';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

type Filter = {
    title: string;
    items: MenuItem[];
};

type FiltersProps = {
    namespace: string;
};

export default function Filters({ namespace }: FiltersProps) {
    const { filters } = usePage<{
        filters: Filter[];
    }>().props;

    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [showCreatePanel, toggleCreatePanel] = useToggle(false);

    return (
        <>
            <div className="mb-4 flex items-center gap-2 md:mb-6">
                <LightBtn
                    className="w-fit items-center gap-2"
                    onClick={() => toggleCreatePanel()}
                >
                    Новая категория
                    <ChevronDownIcon className="size-4" />
                </LightBtn>
            </div>
            <ul className="space-y-4 md:space-y-6">
                <Transition show={showCreatePanel}>
                    <li
                        key={`create-filter-item`}
                        className="max-h-500 list-none transition-all duration-500 ease-in data-closed:max-h-0 data-closed:opacity-0 data-closed:ease-out"
                    >
                        <FilterUpsert
                            closeForm={() => toggleCreatePanel(false)}
                            routeName={route(
                                `admin.${namespace}.filters.store`,
                            )}
                        />
                    </li>
                </Transition>
                {Object.entries(filters || {}).map(([category, items]) => (
                    <li
                        key={category}
                        className="list-none space-y-4"
                    >
                        <FilterUpsert
                            onDeleteClick={() => setSelectedFilter(category)}
                            filter={category}
                            routeName={route(
                                `admin.${namespace}.filters.update`,
                                category,
                            )}
                        />

                        <FilterPanel
                            title={category}
                            items={items}
                            namespace={namespace}
                        />
                    </li>
                ))}
            </ul>

            {selectedFilter != null && (
                <ConfirmationDialog
                    show={selectedFilter != null}
                    closeDialog={() => setSelectedFilter(null)}
                    title="Вы точно уверены, что хотите удалить все фильтры в данной категории?"
                    routeName={route(`admin.${namespace}.filters.massDestroy`)}
                    payload={{ title: selectedFilter }}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </>
    );
}
