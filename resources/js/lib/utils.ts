import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string, separator: string = '-'): string {
  return text
    .normalize('NFKD') // normalize unicode (buat hilangin aksen)
    .replace(/[\u0300-\u036f]/g, '') // hapus karakter diacritics (é => e)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator) // ganti semua non-alphanumeric jadi separator
    .replace(new RegExp(`${separator}+`, 'g'), separator) // hapus separator dobel
    .replace(new RegExp(`^${separator}|${separator}$`, 'g'), ''); // hapus separator di awal/akhir
}

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Gagal copy:', err);
  }
};
