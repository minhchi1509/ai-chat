import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const delay = (seconds: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, seconds * 1000);
  });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
