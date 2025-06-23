import { Metadata } from 'next';
import RoleDetailPage from '@/pages/RoleDetailPage';

type Params = { id: string };

export function generateMetadata(): Metadata {
    return {
        title: `Role Detail`,
        description: 'Timesheet role management page',
    };
}

export default async function RoleDetail({
    params,
}: {
    params: Promise<Params>;
}) {
    const { id } = await params;
    return <RoleDetailPage id={id} />;
}
