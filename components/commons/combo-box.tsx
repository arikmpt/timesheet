'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Option {
    label: string;
    value: string;
}

interface IProps {
    disabled: boolean;
    onChange: (value: string) => void;
    options: Option[];
    placeholder: string;
    value: string;
}

export function ComboBox({
    disabled,
    onChange,
    options,
    placeholder,
    value,
}: IProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    role={'combobox'}
                    aria-expanded={open}
                    className={'w-full justify-between !bg-white'}
                    disabled={disabled}
                >
                    {value
                        ? options.find((option) => option.value === value)
                              ?.label
                        : placeholder}
                    <ChevronsUpDown className={'opacity-50'} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={'w-[350px] p-0'}>
                <Command>
                    <CommandInput placeholder={'Search'} className={'h-9'} />
                    <CommandList>
                        <CommandEmpty>{'No Data'}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option, index) => (
                                <CommandItem
                                    key={index}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        onChange(
                                            currentValue === value
                                                ? ''
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === option.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
