'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface IProps {
    captionLayout?: 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';
    date: Date;
    onSelect: (date?: Date) => void;
}

export function DatePicker({ captionLayout, date, onSelect }: IProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full !bg-white justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>{'Pick a date'}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={'w-auto p-0'} align={'start'}>
                <Calendar
                    mode={'single'}
                    captionLayout={captionLayout}
                    selected={date}
                    fromYear={1900}
                    toYear={Number(format(new Date(), 'yyyy'))}
                    onSelect={(date) => onSelect(date)}
                    initialFocus
                    today={new Date(date)}
                />
            </PopoverContent>
        </Popover>
    );
}
