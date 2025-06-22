import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function EditProfilePage() {
    return (
        <div className={'flex flex-1 flex-col gap-4 p-4'}>
            <h1 className={'text-xl font-medium'}>{'Edit Profile Page'}</h1>
            <div className={'flex gap-4'}>
                <Card className={'w-[350px]'}>
                    <CardHeader>
                        <CardTitle className={'text-center'}>
                            {'Edit Profile'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={'grid w-full items-center gap-4'}>
                            <div className={'flex flex-col space-y-1.5'}></div>
                            <div className={'flex flex-col space-y-1.5'}></div>
                        </div>
                    </CardContent>
                    <CardFooter className={'flex flex-col gap-3'}></CardFooter>
                </Card>
            </div>
        </div>
    );
}
