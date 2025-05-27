import { writable } from 'svelte/store'
import type { User } from '@supabase/supabase-js'

export interface Iprompt {
    id: string
    created_at: Date
    user_id: string
    title: string
    input: string
    model: string
    tags: string[]
    deeplink: string
    result?: string
    result_text?: string
    result_url?: string
    type: 'image' | 'text'
}

export let user = writable<User | null>(null)
export const promts = $state<{ list: Iprompt[] }>({ list: [] })
export const savedPrompts = writable<Iprompt[]>([])