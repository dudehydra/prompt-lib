<script>
    import PromptCard from "../components/PromptCard.svelte";
    import "../app.css";
    import AddPromptModal from "../components/AddPromptModal.svelte";
    import { promts } from "$lib/stores/shared.svelte";
    import { onMount } from "svelte";
    import { getPrompts } from "$lib/api/prompts";

    onMount(async () => {
        let newPrompts = await getPrompts();
        promts.list = newPrompts;
    });
</script>

<h1 class="text-3xl font-bold mb-6">🎨 Библиотека AI-результатов</h1>
<AddPromptModal />
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each promts.list as prompt}
        <PromptCard data={prompt} />
    {/each}
</div>
