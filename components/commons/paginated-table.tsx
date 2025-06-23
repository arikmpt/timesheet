'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { OPTIONS_TOTAL_PAGE } from '@/constants/common';
import { cn } from '@/lib/utils';

type PaginationMeta = {
    currentPage: number;
    totalPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    pages: number[];
};

type Column<T> = {
    key: keyof T | string;
    header: string;
    render?: (item: T, index: number) => React.ReactNode;
    className?: string;
};

interface PaginatedTableProps<T> {
    title?: string;
    columns: Column<T>[];
    data: T[];
    isLoading: boolean;
    pagination: PaginationMeta;
    limit: number;
    onLimitChange: (limit: number) => void;
    page: number;
    onPageChange: (page: number) => void;
    search?: string;
    onSearch?: (value: string) => void;
}

export function PaginatedTable<T extends { id: string | number }>({
    title = 'Data Table',
    columns,
    data,
    isLoading,
    pagination,
    limit,
    onLimitChange,
    page,
    onPageChange,
    search,
    onSearch,
}: PaginatedTableProps<T>) {
    return (
        <div className='flex flex-1 flex-col gap-4 p-4'>
            <h1 className='text-xl font-medium'>{title}</h1>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between'>
                            {onSearch && (
                                <Input
                                    type='text'
                                    placeholder='Search...'
                                    className='max-w-3xs'
                                    onChange={(e) => onSearch(e.target.value)}
                                    defaultValue={search}
                                />
                            )}
                            <span className={'text-sm flex items-end'}>
                                Total Data: {pagination.totalPage}
                            </span>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='w-[80px]'>
                                        No
                                    </TableHead>
                                    {columns.map((col, i) => (
                                        <TableHead
                                            key={i}
                                            className={cn(col.className)}
                                        >
                                            {col.header}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell
                                            className='text-center'
                                            colSpan={columns.length + 1}
                                        >
                                            <Spinner size='small' />
                                        </TableCell>
                                    </TableRow>
                                ) : data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            className='text-center'
                                            colSpan={columns.length + 1}
                                        >
                                            No data
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                {(page - 1) * limit + index + 1}
                                            </TableCell>
                                            {columns.map((col, i) => (
                                                <TableCell key={i}>
                                                    {col.render
                                                        ? col.render(row, index)
                                                        : (row as never)[
                                                              col.key
                                                          ]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        <div className='flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className='text-sm'>Per Page</span>
                                <Select
                                    onValueChange={(v) =>
                                        onLimitChange(parseInt(v))
                                    }
                                    value={limit.toString()}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {OPTIONS_TOTAL_PAGE.map(
                                            (total, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={total.toString()}
                                                >
                                                    {total}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Pagination className='justify-end w-auto'>
                                <PaginationContent>
                                    {pagination.hasPrevPage && (
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() =>
                                                    onPageChange(page - 1)
                                                }
                                            />
                                        </PaginationItem>
                                    )}
                                    {pagination.pages.map((p, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                isActive={page === p}
                                                onClick={() => onPageChange(p)}
                                            >
                                                {p}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    {pagination.pages.length > 5 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}
                                    {pagination.hasNextPage && (
                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() =>
                                                    onPageChange(page + 1)
                                                }
                                            />
                                        </PaginationItem>
                                    )}
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
