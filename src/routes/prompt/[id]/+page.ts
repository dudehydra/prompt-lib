import type { PageLoad } from '../$types';
import prompts from "../../../data/prompts.json";

export const load: PageLoad = ({ params }) => {
    const prompt = prompts.find((p) => p.id === params.id);
    if (!prompt) {
        throw new Error('Prompt not found');
    }

    return { prompt };
};