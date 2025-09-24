import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import AdminLayout from '@/layouts/admin/admin-layout';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { editors } = usePage<{
        editors: PaginationMeta<User>;
    }>().props;


    return (
        <AdminLayout>
            <TableHeader
                label={'все админы'}
                badge={`${editors.data.length} аккаунтов`}
                createRoute={route('admin.editors.create')}
            />
            <Table
                meta={editors}
                width="min-w-150"
                columns={['Имя администратора', 'Email', 'Статус']}
            >
                {editors.data.map((editor) => (
                    <EditorItem
                        key={editor.id}
                        editor={editor}
                    />
                ))}
            </Table>
        </AdminLayout>
    );
}

type EditorItemProps = {
    editor: User;
};

function EditorItem({ editor }: EditorItemProps) {
    return (
        <div
            className={cn(
                'flex items-center gap-2 text-text-black md:justify-between',
            )}
        >
            <div className="w-3/7">
                <Link
                    href={route('admin.editors.show', editor.id)}
                    prefetch
                    preserveState
                    className="cursor-pointer text-left underline-offset-4 transition-colors duration-200 ease-in-out hover:text-bright-salad hover:underline"
                    as="button"
                >{`${editor.name} ${editor.surname}`}</Link>
            </div>
            <span className="">{editor.email}</span>
            <span className="ml-auto text-right">
                {editor.banned ? 'Заблокирован' : 'Активен'}
            </span>
        </div>
    );
}
