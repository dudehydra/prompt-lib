import { redirect } from '@sveltejs/kit'
import { user } from '$lib/stores/shared.svelte'

export async function load() {

    if (!user) {
        throw redirect(302, '/')
    }

    return user
}