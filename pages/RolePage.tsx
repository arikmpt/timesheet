'use client';

import { Button } from '@/components/ui/button';
import { PaginatedTable } from '@/components/commons/paginated-table';
import { DEFAULT_PAGE, DEFAULT_TOTAL_PAGE } from '@/constants/common';
import { useRoles } from '@/hooks/queries/use-roles';
import { useState } from 'react';
import Link from 'next/link';
import { routes } from '@/constants/routes';

export default function RolePage() {
    const [search, setSearch] = useState<string>('');
    const [limit, setLimit] = useState<number>(DEFAULT_TOTAL_PAGE);
    const [page, setPage] = useState<number>(DEFAULT_PAGE);

    const { data, isLoading } = useRoles({
        page,
        limit,
        search,
    });

    return (
        <PaginatedTable
            title='Role Management'
            columns={[
                {
                    key: 'name',
                    header: 'Name',
                },
                {
                    key: 'id',
                    header: 'Action',
                    className: 'w-[200px] text-center',
                    render: (role) => (
                        <div className='flex gap-3 justify-center'>
                            <Button variant='outline'>Edit</Button>
                            <Button variant='secondary' asChild>
                                <Link
                                    href={routes.ROLE_DETAIL_MANAGEMENT(
                                        role.id
                                    )}
                                >
                                    Detail
                                </Link>
                            </Button>
                        </div>
                    ),
                },
            ]}
            data={data?.roles ?? []}
            isLoading={isLoading}
            pagination={
                data?.meta ?? {
                    currentPage: page,
                    totalPage: 1,
                    hasNextPage: false,
                    hasPrevPage: false,
                    pages: [1],
                }
            }
            page={page}
            onPageChange={setPage}
            limit={limit}
            onLimitChange={setLimit}
            search={search}
            onSearch={setSearch}
        />
    );
}
