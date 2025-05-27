import { writable, type Writable } from 'svelte/store'
import type { Iprompt } from './shared.svelte';

type AuthMode = 'login' | 'register' | null

export const authModalOpen = writable(false)
export const authMode = writable<AuthMode>(null)

export const deleteModalOpen = writable(false);
export const deleteModalData: Writable<Iprompt | null> = writable(null);

export function openAuth(mode: AuthMode) {
  authMode.set(mode)
  authModalOpen.set(true)
}

export function closeAuth() {
  authModalOpen.set(false)
  authMode.set(null)
}