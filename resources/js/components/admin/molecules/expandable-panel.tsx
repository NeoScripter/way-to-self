import useToggle from '@/hooks/use-toggle';
import { cn } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
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

    const collapseAllAccordions = () => {
        document.dispatchEvent(new CustomEvent('accordion:collapseAll'));
    };

    const handleToggle = () => {
        if (!show) {
            // If currently closed, open this one and close others
            collapseAllAccordions();
            toggle(true);
        } else {
            // If currently open, just close this one
            toggle(false);
        }
    };

    useEffect(() => {
        const handleAccordionCollapse = () => toggle(false);

        document.addEventListener(
            'accordion:collapseAll',
            handleAccordionCollapse,
        );
        return () =>
            document.removeEventListener(
                'accordion:collapseAll',
                handleAccordionCollapse,
            );
    }, []);

    return (
        <div
            className={cn(
                'space-y-6 rounded-md transition-[padding] duration-200 ease-in',
                show &&
                    'sm:border sm:border-dark-green sm:p-4 sm:shadow-md md:p-8',
            )}
        >
            <div className="mb-4 flex items-center gap-2 md:mb-6">
                <LightBtn onClick={handleToggle}>
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
