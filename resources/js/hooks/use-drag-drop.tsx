import { cn } from '@/lib/utils';
import {
    DndContext,
    MouseSensor,
    useDraggable,
    useDroppable,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { router } from '@inertiajs/react';

type useDragDropProps = {
    namespace: string;
};

export function useDragDrop({ namespace }: useDragDropProps) {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 10 },
    });

    const sensors = useSensors(mouseSensor);

    function handleDragEnd(event: any) {
        const { over, active } = event;
        if (!over || !active || active.id === over.id) return;

        router.visit(route(`${namespace}.reorder`, over.id), {
            method: 'patch',
            data: { id: active.id },
            preserveScroll: true,
            preserveState: true,
        });
    }

    function Draggable({
        id,
        children,
    }: {
        id: string | number;
        children: React.ReactNode;
    }) {
        const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id,
        });
        const style = transform
            ? {
                  transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
                  opacity: 0.95,
              }
            : undefined;

        return (
            <div
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
            >
                {children}
            </div>
        );
    }

    function Droppable({
        id,
        children,
    }: {
        id: string | number;
        children: React.ReactNode;
    }) {
        const { isOver, setNodeRef } = useDroppable({ id });
        return (
            <div
                ref={setNodeRef}
                className={cn(
                    isOver &&
                        'text-bright-salad [&_button]:border-bright-salad',
                )}
            >
                {children}
            </div>
        );
    }

    return { DndContext, Draggable, Droppable, handleDragEnd, sensors };
}
