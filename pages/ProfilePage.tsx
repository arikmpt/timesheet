'use client';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { routes } from '@/constants/routes';
import { useProfile } from '@/hooks/queries/use-profile';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { data: profile, isLoading } = useProfile();
    const router = useRouter();

    const onGoToEditProfile = () => {
        router.push(routes.EDIT_PROFILE);
    };

    return (
        <div className={'flex flex-1 flex-col gap-4 p-4'}>
            <h1 className={'text-xl font-medium'}>{'Profile Page'}</h1>
            <div className={'flex gap-4'}>
                <Card className={'w-[500px]'}>
                    <CardHeader>
                        <CardTitle>{'Profile Page'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={'grid w-full items-center gap-4'}>
                            <div className={'flex flex-col space-y-1.5'}>
                                <Label>{'Email'}</Label>
                                <span>{profile?.user?.email ?? '-'}</span>
                            </div>
                            <div className={'flex flex-col space-y-1.5'}>
                                <Label>{'First Name'}</Label>
                                <span>{profile?.firstName ?? '-'}</span>
                            </div>
                            <div className={'flex flex-col space-y-1.5'}>
                                <Label>{'Last Name'}</Label>
                                <span>{profile?.lastName ?? '-'}</span>
                            </div>
                            <div className={'flex flex-col space-y-1.5'}>
                                <Label>{'Country Code'}</Label>
                                <span>{profile?.countryCode ?? '-'}</span>
                            </div>
                            <div className={'flex flex-col space-y-1.5'}>
                                <Label>{'Contact Number'}</Label>
                                <span>{profile?.contactNumber ?? '-'}</span>
                            </div>
                            <div className={'flex flex-col space-y-1.5'}>
                                <Label>{'Birth of Date'}</Label>
                                <span>
                                    {profile?.birthOfDate
                                        ? format(profile?.birthOfDate, 'PPP')
                                        : '-'}
                                </span>
                            </div>
                            <div className={'flex flex-col space-y-1.5'}>
                                <Label>{'Place of Birth'}</Label>
                                <span>{profile?.placeOfBirth ?? '-'}</span>
                            </div>
                            <div className={'flex flex-col space-y-1.5'}>
                                <Label>{'Address'}</Label>
                                <span>{profile?.address ?? '-'}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className={'flex flex-col gap-3'}>
                        <Button
                            variant={'default'}
                            disabled={isLoading}
                            onClick={onGoToEditProfile}
                        >
                            {'Edit Profile'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
