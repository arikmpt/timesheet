'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormInput from '@/components/commons/form-input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/queries/use-login';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export default function LoginPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { mutate, isPending } = useLogin();

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={'space-y-8'}
            >
                <Card className={'w-[350px]'}>
                    <CardHeader>
                        <CardTitle className={'text-center'}>
                            {'Sign In'}
                        </CardTitle>
                        <CardDescription className={'text-center'}>
                            {'Please sign in to our platform to continue.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={'grid w-full items-center gap-4'}>
                            <div className={'flex flex-col space-y-1.5'}>
                                <FormInput
                                    control={form.control}
                                    name={'email'}
                                    label={'Email Address'}
                                    placeholder={'example@email.com'}
                                    type={'email'}
                                    disabled={isPending}
                                />
                            </div>
                            <div className={'flex flex-col space-y-1.5'}>
                                <FormInput
                                    control={form.control}
                                    name={'password'}
                                    label={'Password'}
                                    placeholder={'********'}
                                    type={'password'}
                                    disabled={isPending}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className={'flex flex-col gap-3'}>
                        <Button
                            className={'w-full'}
                            type={'submit'}
                            disabled={isPending}
                        >
                            {'Login'}
                        </Button>
                        <Button
                            className={'w-full'}
                            variant={'link'}
                            disabled={isPending}
                        >
                            {'Reset Password'}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
