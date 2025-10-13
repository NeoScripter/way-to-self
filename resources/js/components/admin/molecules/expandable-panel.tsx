import useToggle from '@/hooks/use-toggle';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import LightBtn from '../atoms/light-btn';

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
                <LightBtn onClick={() => toggle()}>
                    {label}
                    <ChevronDownIcon className="mt-1 size-5" />
                </LightBtn>
            </div>
            <Transition show={show}>
                <div className="max-h-2000 list-decimal transition-all duration-500 ease-in data-closed:max-h-0 data-closed:opacity-0 data-closed:ease-out">
                    {children}
                </div>
            </Transition>
        </div>
    );
}
