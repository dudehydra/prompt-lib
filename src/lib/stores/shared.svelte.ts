import { writable } from 'svelte/store'
import type { User } from '@supabase/supabase-js'

export let user = $state<{user: User | null}>({user: null})
export const promts = $state<{ list: any[] }>({ list: [] })
export const savedPromts = writable<{ list: any[] }>({ list: [] })