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

// Удаляем и prompt и картинку (если она была)
export async function deletePromptById(id: string, resultUrl: string, type: string) {
    if (type === 'image' && resultUrl) {
        // Путь к файлу из URL
        const path = resultUrl.split('/').slice(-1)[0];
        const { error: deleteImageError } = await supabase.storage.from('images').remove([path])
        if (deleteImageError) {
            console.error('Ошибка удаления картинки:', deleteImageError.message)
        }
    }
    const { error } = await supabase.from('prompts').delete().eq('id', id)
    if (error) {
        console.error('Ошибка удаления промта:', error.message)
        return false
    }

    return true
}

export async function getPromptsByTags(tags: string[]) {
    let query = supabase.from("prompts").select("*").order("created_at", { ascending: false });

    if (tags.length > 0) {
        const orFilter = tags.map(tag => `tags.cs.{${tag}}`).join(',');
        query = query.or(orFilter);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
}

// lib/supabase/saved.ts
export async function getSavedPromptsForCurrentUser() {
    const { data, error } = await supabase
        .from("saved_prompts")
        .select("prompt:prompt_id(*)")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data.map(row => row.prompt);
}

export async function unsavePrompt(prompt_id: string, user_id: string) {
    const { error } = await supabase
        .from("saved_prompts")
        .delete()
        .eq("prompt_id", prompt_id)
        .eq("user_id", user_id);
    if (error) throw error;
}
export async function savePrompt(prompt_id: string, user_id: string) {
    const { data, error } = await supabase
        .from("saved_prompts")
        .insert([{ prompt_id, user_id }]);
    if (error) throw error;
    return data;
}