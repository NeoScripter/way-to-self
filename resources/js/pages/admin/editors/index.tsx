import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import AdminLayout from '@/layouts/admin/admin-layout';
import pluralizeRu from '@/lib/helpers/pluralize';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { editors, count } = usePage<{
        editors: PaginationMeta<User>;
        count: number;
    }>().props;

    const badge = pluralizeRu(count, 'аккаунт', 'аккаунта', 'аккаунтов');

    return (
        <AdminLayout>
            <TableHeader
                only={['users']}
                label={'все админы'}
                badge={`${count} ${badge}`}
                createRoute={route('admin.editors.create')}
            />
            <Table
                meta={editors}
                width="min-w-120 sm:min-w-150 lg:min-w-200"
                columns={['Имя администратора', 'Email', 'Статус']}
                isEmpty={editors.data.length === 0}
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
                editor.banned && 'text-red-700',
            )}
        >
            <div className="w-3/7">
                <Link
                    href={route('admin.editors.show', editor.id)}
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
