'use client';
import FormInput from '@/components/commons/form-input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { routes } from '@/constants/routes';
import Link from 'next/link';
import { useChangePassword } from '@/hooks/queries/use-change-password';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z
    .object({
        oldPassword: z
            .string()
            .min(6, 'Old password must be at least 6 characters'),
        newPassword: z
            .string()
            .min(8, 'New password must be at least 8 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword !== data.oldPassword, {
        path: ['newPassword'],
        message: 'New password must be different from old password',
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

export default function ChangePasswordPage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { mutate, isPending } = useChangePassword({
        onSuccess: async (data) => {
            toast.success('Success', {
                description: data.message,
                position: 'top-right',
            });
            router.push(routes.LOGIN);
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values);
    };

    const isDisabled = isPending;

    return (
        <div className={'flex flex-1 flex-col gap-4 p-4'}>
            <h1 className={'text-xl font-medium'}>{'Change Password Page'}</h1>
            <div className={'flex gap-4'}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={'w-1/2'}
                    >
                        <Card className={'w-full'}>
                            <CardHeader>
                                <CardTitle>
                                    {
                                        'Please fill this form below to change your password'
                                    }
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className={'grid w-full items-center gap-4'}
                                >
                                    <div
                                        className={'flex flex-col space-y-1.5'}
                                    >
                                        <FormInput
                                            control={form.control}
                                            name={'oldPassword'}
                                            label={'Old Password'}
                                            type={'password'}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                    <div
                                        className={'flex flex-col space-y-1.5'}
                                    >
                                        <FormInput
                                            control={form.control}
                                            name={'newPassword'}
                                            label={'New Password'}
                                            type={'password'}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                    <div
                                        className={'flex flex-col space-y-1.5'}
                                    >
                                        <FormInput
                                            control={form.control}
                                            name={'confirmPassword'}
                                            label={'Confirm Password'}
                                            type={'password'}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className={'flex justify-between'}>
                                <Button
                                    type={'button'}
                                    asChild
                                    variant={'outline'}
                                >
                                    <Link href={routes.ROOT}>{'Kembali'}</Link>
                                </Button>
                                <Button type={'submit'}>{'Submit'}</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    );
}
