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

export function errorHandler(error: unknown) {
  if (error == null) {
    return 'unknown error';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}
