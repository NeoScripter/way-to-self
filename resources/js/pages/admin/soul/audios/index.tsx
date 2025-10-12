import TrashBtn from '@/components/admin/atoms/trash-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import LazyImage from '@/components/user/atoms/lazy-image';
import AdminLayout from '@/layouts/admin/admin-layout';
import pluralizeRu from '@/lib/helpers/pluralize';
import { shortenDescription } from '@/lib/helpers/shortenDescription';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { Audio } from '@/types/model';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { soulMenuItems } from '../soul-menu-items';

export default function Index() {
    const { audios, count } = usePage<{
        audios: PaginationMeta<Audio>;
        count: number;
        namespace: string;
    }>().props;

    const [selectedAudio, setSelectedAudio] = useState<Audio | null>(null);

    const badge = pluralizeRu(count, 'медитация', 'медитации', 'медитаций');

    return (
        <AdminLayout topMenuItems={soulMenuItems}>
            <TableHeader
                only={['audios']}
                label={'все практики'}
                badge={`${count} ${badge}`}
                createRoute={route(`admin.soul.audios.create`)}
            />
            <Table
                meta={audios}
                width="min-w-150 sm:min-w-180 lg:min-w-220 space-y-8"
                columns={['Фото', 'Заголовок', 'Краткое описание', '']}
                isEmpty={audios.data.length === 0}
                columnClass="!text-center"
            >
                {audios.data.map((audio) => (
                    <AudioItem
                        key={audio.id}
                        audio={audio}
                        onClick={() => setSelectedAudio(audio)}
                    />
                ))}
            </Table>

            {selectedAudio != null && (
                <ConfirmationDialog
                    show={selectedAudio != null}
                    closeDialog={() => setSelectedAudio(null)}
                    title="Вы точно уверены, что хотите удалить данную медитацию?"
                    routeName={route(
                        `admin.soul.audios.destroy`,
                        selectedAudio,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </AdminLayout>
    );
}

type AudioItemProps = {
    audio: Audio;
    onClick: () => void;
};

function AudioItem({ audio, onClick }: AudioItemProps) {
    return (
        <div
            className={cn(
                'relative grid grid-cols-4 gap-2 text-center text-text-black md:justify-between',
            )}
        >
            <Link
                href={route(`admin.soul.audios.show`, audio.id)}
                className="transition-scale block cursor-pointer duration-200 hover:scale-105"
                as="button"
            >
                {audio.image && (
                    <LazyImage
                        parentClass="max-w-25 mx-auto"
                        img={audio.image.path}
                        tinyImg={audio.image.tiny_path}
                        alt={audio.image.alt}
                    />
                )}
            </Link>

            <span className="pt-4 font-semibold">{audio.title}</span>
            <span className="">{shortenDescription(audio.description)}</span>
            <div className="flex items-center justify-end gap-2">
                <Link
                    href={route(`admin.soul.audios.show`, audio.id)}
                    className="ease cursor-pointer text-dark-green transition-colors duration-200 hover:text-light-swamp"
                    as="button"
                >
                    <PencilIcon className="size-6" />
                </Link>
                <TrashBtn
                    onClick={onClick}
                    size="size-7"
                />
            </div>
        </div>
    );
}
