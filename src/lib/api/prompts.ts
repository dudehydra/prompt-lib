import { supabase } from '$lib/supabaseClient'

export async function getUserPrompts(userId: string) {
    const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    if (error) throw error
    return data
}

export async function getPrompts() {
    const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false })
    if (error) throw error
    return data
}
export async function getPromptById(id: string) {
    const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}