import { writable } from 'svelte/store';

export const filterStatus = writable<string>('all');