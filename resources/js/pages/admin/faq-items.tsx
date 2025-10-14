import LightBtn from '@/components/admin/atoms/light-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import FaqItemUpsert from '@/components/admin/molecules/faq-upsert';
import useToggle from '@/hooks/use-toggle';
import { FaqItem } from '@/types/model';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

type FaqItemsProps = {
    namespace: string;
};

export default function FaqItems({ namespace }: FaqItemsProps) {
    const { faqs } = usePage<{
        faqs: FaqItem[];
    }>().props;

    const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
    const [showCreatePanel, toggleCreatePanel] = useToggle(false);

    return (
        <>
            <div className="mb-4 flex items-center gap-2 md:mb-6">
                <LightBtn
                    className="w-fit items-center gap-2"
                    onClick={() => toggleCreatePanel()}
                >
                    Новый вопрос
                    <ChevronDownIcon className="size-4" />
                </LightBtn>
            </div>
            <ul className="space-y-4 md:space-y-6">
                <Transition show={showCreatePanel}>
                    <li
                        key={`create-faq-item`}
                        className="max-h-500 list-decimal transition-all duration-500 ease-in data-closed:max-h-0 data-closed:opacity-0 data-closed:ease-out"
                    >
                        <FaqItemUpsert
                            closeForm={() => toggleCreatePanel(false)}
                            routeName={route(`admin.${namespace}.faqs.store`)}
                        />
                    </li>
                </Transition>
                {faqs?.map((faq) => (
                    <li
                        key={`faq-${faq.id}`}
                        className="list-decimal"
                    >
                        <FaqItemUpsert
                            onDeleteClick={() => setSelectedFaq(faq)}
                            faq={faq}
                            routeName={route(
                                `admin.${namespace}.faqs.update`,
                                faq.id,
                            )}
                        />
                    </li>
                ))}
            </ul>

            {selectedFaq != null && (
                <ConfirmationDialog
                    show={selectedFaq != null}
                    closeDialog={() => setSelectedFaq(null)}
                    title="Вы точно уверены, что хотите удалить данный вопрос?"
                    routeName={route(
                        `admin.${namespace}.faqs.destroy`,
                        selectedFaq,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </>
    );
}
