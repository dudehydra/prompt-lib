<script>
    import PromptCard from "../components/PromptCard.svelte";
    import "../app.css";
    import AddPromptModal from "../components/AddPromptModal.svelte";
    import { promts } from "$lib/stores/shared.svelte";
    import { onMount } from "svelte";
    import { getPrompts, getPromptsByTags } from "$lib/api/prompts";
    import { supabase } from "$lib/supabaseClient";
    import TagSelector from "../components/TagSelector.svelte";

    /**
     * @type {any[]}
     */
    let selectedTags = [];
    /**
     * @type {never[]}
     */
    let popularTags = [];
    async function loadPrompts() {
        promts.list = await getPromptsByTags(selectedTags);
    }
    /**
     * @param {any[]} tags
     */
    function onTagsChange(tags) {
        selectedTags = tags;
        loadPrompts();
    }

    onMount(async () => {
        let newPrompts = await getPrompts();
        const { data, error } = await supabase.rpc("get_popular_tags", {
            limit_val: 10,
        });
        popularTags = data.map((tag) => tag.tag);
        promts.list = newPrompts;
    });
</script>

<h1 class="text-3xl font-bold mb-6">🎨 Библиотека AI-результатов</h1>
<AddPromptModal />
<TagSelector allTags={popularTags} {selectedTags} onChange={onTagsChange} />

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each promts.list as prompt}
        <PromptCard data={prompt} />
    {/each}
</div>
