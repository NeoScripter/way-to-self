import DarkBtn from '@/components/user/atoms/dark-btn';
import useToggle from '@/hooks/use-toggle';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

type ExpandablePanelProps = {
    label: string;
    children: React.ReactNode;
};

export default function ExpandablePanel({
    label,
    children,
}: ExpandablePanelProps) {
    const [show, toggle] = useToggle(false);

    return (
        <div className="space-y-6">
            <div className="mb-4 flex items-center gap-2 md:mb-6">
                <DarkBtn
                    type='button'
                    className="w-100 rounded-sm flex max-w-full justify-between"
                    onClick={() => toggle()}
                >
                    {label}
                    <ChevronDownIcon className="size-5 mt-1" />
                </DarkBtn>
            </div>
            <Transition show={show}>
                <div
                    className="max-h-500 list-decimal font-bold transition-all duration-500 ease-in data-closed:max-h-0 data-closed:opacity-0 data-closed:ease-out"
                >
                    {children}
                </div>
            </Transition>
        </div>
    );
}
