import { getPromptById } from '$lib/api/prompts';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ params }) => {
    const prompt = await getPromptById(params.id)

    return { prompt };
};