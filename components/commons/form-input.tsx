import { Control, FieldValues, Path } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type IProps<T extends FieldValues> = Pick<
    React.ComponentProps<'input'>,
    'placeholder' | 'type' | 'disabled'
> & {
    control: Control<T, object>;
    label?: string;
    name: Path<T>;
};

export default function FormInput<T extends FieldValues>({
    control,
    disabled,
    label,
    name,
    placeholder,
    type,
}: IProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            type={type}
                            disabled={disabled}
                            defaultValue={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
