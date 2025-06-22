import { Control, FieldValues, Path } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';

type IProps<T extends FieldValues> = Pick<
    React.ComponentProps<'textarea'>,
    'placeholder' | 'disabled'
> & {
    control: Control<T, object>;
    label?: string;
    name: Path<T>;
};

export default function FormTextArea<T extends FieldValues>({
    control,
    disabled,
    label,
    name,
    placeholder,
}: IProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
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
