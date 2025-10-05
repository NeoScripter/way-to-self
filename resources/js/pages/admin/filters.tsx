import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import FilterUpsert from '@/components/admin/molecules/filter-upsert';
import useToggle from '@/hooks/use-toggle';
import { CategoryFilter  } from '@/types/model';
import { Transition } from '@headlessui/react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

type FiltersProps = {
    namespace: string;
};

export default function Filters({ namespace }: FiltersProps) {
    const { filters } = usePage<{
        filters: CategoryFilter[];
    }>().props;

    const [selectedFilter, setSelectedFilter] = useState<CategoryFilter | null>(null);
    const [showCreatePanel, toggleCreatePanel] = useToggle(false);

    return (
        <>
            <div className="mb-4 flex items-center gap-2 md:mb-6">
                <NeutralBtn onClick={() => toggleCreatePanel()}>
                    Новый вопрос
                </NeutralBtn>
            </div>
            <ul className="space-y-4 md:space-y-6">
                <Transition show={showCreatePanel}>
                    <li
                        key={`create-filter-item`}
                        className="max-h-500 list-decimal font-bold transition-all duration-500 ease-in data-closed:max-h-0 data-closed:opacity-0 data-closed:ease-out"
                    >
                        <FilterUpsert
                            closeForm={() => toggleCreatePanel(false)}
                            routeName={route(`admin.${namespace}.filters.store`)}
                        />
                    </li>
                </Transition>
                {filters?.map((filter) => (
                    <li
                        key={`filter-${filter.id}`}
                        className="list-decimal font-bold"
                    >
                        <FilterUpsert
                            onDeleteClick={() => setSelectedFilter(filter)}
                            filter={filter}
                            routeName={route(
                                `admin.${namespace}.filters.update`,
                                filter.id,
                            )}
                        />
                    </li>
                ))}
            </ul>

            {selectedFilter != null && (
                <ConfirmationDialog
                    show={selectedFilter != null}
                    closeDialog={() => setSelectedFilter(null)}
                    title="Вы точно уверены, что хотите удалить все фильтры в данной категории?"
                    routeName={route(
                        `admin.${namespace}.filters.destroy`,
                        selectedFilter,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </>
    );
}
