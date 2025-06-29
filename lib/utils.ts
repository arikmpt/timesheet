import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}
