'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { routes } from '@/constants/routes';
import { useRole } from '@/hooks/queries/use-role';
import { format } from 'date-fns';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';

interface IProps {
    id: string;
}

export default function RoleDetailPage({ id }: IProps) {
    const { isLoading, data, isError } = useRole(parseInt(id));

    if (isError) {
        return (
            <div className='flex flex-1 flex-col gap-4 p-4'>
                <h1 className='text-xl font-medium'>
                    {'Role Detail Management'}
                </h1>
                <div className='flex flex-col'>
                    <Button variant={'link'} asChild>
                        <div className='flex gap-1'>
                            <MoveLeft />
                            <Link href={routes.ROLE_MANAGEMENT}>Kembali</Link>
                        </div>
                    </Button>
                    <Card className='w-full'>
                        <CardContent>
                            <span>No Data</span>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-1 flex-col gap-4 p-4'>
            <h1 className='text-xl font-medium'>{'Role Detail Management'}</h1>
            <div className='flex flex-col'>
                <Button variant={'link'} asChild>
                    <div className='flex gap-1'>
                        <MoveLeft />
                        <Link href={routes.ROLE_MANAGEMENT}>Kembali</Link>
                    </div>
                </Button>
                {isLoading ? (
                    <Card className='w-full'>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className='h-[50px] w-full rounded-xl' />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className='h-[125px] w-full rounded-xl' />
                        </CardContent>
                    </Card>
                ) : (
                    <Card className='w-full'>
                        <CardHeader>
                            <CardTitle>
                                <div className='flex justify-between'>
                                    <span>{data?.role.name ?? ''}</span>
                                    <Button>{'Edit'}</Button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col gap-2'>
                                <span className='text-primary'>
                                    Permission List
                                </span>
                                <div className='flex flex-col gap'>
                                    {data?.role.permissions.map(
                                        (permission) => (
                                            <span key={permission.permissionId}>
                                                {permission.permission.name}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className='flex w-full justify-between'>
                                <span className='text-xs'>{`created at: ${data?.role.createdAt ? format(data?.role.createdAt, 'yyyy-MM-dd H:mm:ss') : ''}`}</span>
                                <span className='text-xs'>{`updated at: ${data?.role.updatedAt ? format(data?.role.updatedAt, 'yyyy-MM-dd H:mm:ss') : ''}`}</span>
                            </div>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
}
