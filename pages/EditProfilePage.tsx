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
import { Form, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DatePicker } from '@/components/commons/date-picker';
import FormTextArea from '@/components/commons/form-text-area';
import { useEffect, useMemo } from 'react';
import { useProfile } from '@/hooks/queries/use-profile';
import { COUNTRIES } from '@/constants/countries';
import SelectBox from '@/components/commons/select-box';
import { useUpdateProfile } from '@/hooks/queries/use-update-profile';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants/routes';
import { useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
    address: z.string().nullable(),
    birthOfDate: z.date().nullable(),
    contactNumber: z.string().nullable(),
    countryCode: z.string().nullable(),
    firstName: z.string(),
    id: z.number(),
    lastName: z.string(),
    placeOfBirth: z.string().nullable(),
});

export default function EditProfilePage() {
    const queryClient = useQueryClient();

    const { data: profile, isLoading } = useProfile();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const birthOfDate = form.watch('birthOfDate')
        ? new Date(form.watch('birthOfDate') ?? '')
        : new Date();

    useEffect(() => {
        if (profile) {
            form.reset({
                ...profile,
                birthOfDate:
                    typeof profile.birthOfDate === 'string'
                        ? new Date(profile.birthOfDate)
                        : profile.birthOfDate,
            });
        }
    }, [form, profile]);

    const { mutate, isPending } = useUpdateProfile({
        onSuccess: async (data) => {
            toast.success('Success', {
                description: data.message,
                position: 'top-right',
            });
            queryClient.setQueryData(['profile'], data.profile);
            router.push(routes.PROFILE);
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate({
            ...values,
            birthOfDate: format(values.birthOfDate ?? new Date(), 'yyyy-MM-dd'),
        });
    };

    const countryOptions = useMemo(
        () =>
            COUNTRIES.flatMap((country) => ({
                label: country.name,
                value: country.code,
            })) ?? [],
        []
    );

    const isDisabled = isLoading || isPending;

    return (
        <div className={'flex flex-1 flex-col gap-4 p-4'}>
            <h1 className={'text-xl font-medium'}>{'Edit Profile Page'}</h1>
            <div className={'flex gap-4'}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={'w-1/2'}
                    >
                        <Card className={'w-full'}>
                            <CardHeader>
                                <CardTitle>{'Update Profile'}</CardTitle>
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
                                            name={'firstName'}
                                            label={'First Name'}
                                            type={'text'}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                    <div
                                        className={'flex flex-col space-y-1.5'}
                                    >
                                        <FormInput
                                            control={form.control}
                                            name={'lastName'}
                                            label={'Last Name'}
                                            type={'text'}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                    <div
                                        className={'flex flex-col space-y-1.5'}
                                    >
                                        <FormLabel>
                                            {'Select Country'}
                                        </FormLabel>
                                        <SelectBox
                                            name={'countryCode'}
                                            options={countryOptions}
                                            disabled={isDisabled}
                                            placeholder={
                                                'Please select country'
                                            }
                                            control={form.control}
                                        />
                                    </div>
                                    <div
                                        className={'flex flex-col space-y-1.5'}
                                    >
                                        <FormInput
                                            control={form.control}
                                            name={'contactNumber'}
                                            label={'Contact Number'}
                                            type={'text'}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                    <div
                                        className={'flex flex-col space-y-1.5'}
                                    >
                                        <FormLabel>{'Birth of Date'}</FormLabel>
                                        <DatePicker
                                            date={birthOfDate}
                                            onSelect={(date) => {
                                                if (date) {
                                                    form.setValue(
                                                        'birthOfDate',
                                                        date
                                                    );
                                                }
                                            }}
                                            captionLayout={'dropdown'}
                                        />
                                    </div>
                                    <div
                                        className={'flex flex-col space-y-1.5'}
                                    >
                                        <FormInput
                                            control={form.control}
                                            name={'placeOfBirth'}
                                            label={'Place of Birth'}
                                            type={'text'}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                    <div
                                        className={'flex flex-col space-y-1.5'}
                                    >
                                        <FormTextArea
                                            control={form.control}
                                            name={'address'}
                                            label={'Address'}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className={'flex justify-end'}>
                                <Button type={'submit'}>{'Submit'}</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    );
}
