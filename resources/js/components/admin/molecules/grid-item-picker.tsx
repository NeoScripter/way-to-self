import { Link } from '@inertiajs/react';
import { X } from 'lucide-react';
import Input from '../atoms/input';

type GridItem = {
    id: number;
    image: string;
    title: string;
    description: string;
};

type ListItem = {
    id: number;
    title: string;
};

type GridItemPickerProps = {
    label?: string;
    gridItems: GridItem[];
    listItems: ListItem[];
    deleteRoute: string;
    storeRoute: string;
    placeholder: string;
};

export default function GridItemPicker({
    label,
    placeholder,
    listItems,
    gridItems,
    deleteRoute,
    storeRoute,
}: GridItemPickerProps) {
    return (
        <section className="">
            {label && <h4 className="mb-2 font-bold">{label}</h4>}
            <div className="rounded-md border border-text-black px-4 py-3">
                <div className="mb-6">
                    <Input placeholder={placeholder} />
                </div>

                <ul className="grid gap-4">
                    {gridItems.map((item) => (
                        <li
                            key={item.id}
                            className="relative space-y-2"
                        >
                            <div>
                                <img
                                    src={item.image}
                                    alt=""
                                />
                            </div>

                            <Link
                                href={deleteRoute}
                                preserveScroll={true}
                                preserveState={false}
                            >
                                <X className="size-4 text-white" />
                            </Link>

                            <h5>{item.title}</h5>

                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
