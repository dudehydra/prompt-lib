import { writable } from 'svelte/store'

type AuthMode = 'login' | 'register' | null

export const authModalOpen = writable(false)
export const authMode = writable<AuthMode>(null)

export const delteModalOpen = writable(false);
export const delteModalData = writable(null);

export function openAuth(mode: AuthMode) {
  authMode.set(mode)
  authModalOpen.set(true)
}

export function closeAuth() {
  authModalOpen.set(false)
  authMode.set(null)
}