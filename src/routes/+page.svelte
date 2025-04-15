<script>
    import PromptCard from "../components/PromptCard.svelte";
    import prompts from "../data/prompts.json";
    import "../app.css";
</script>

<main class="max-w-5xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">🎨 Библиотека AI-результатов</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each prompts as prompt}
            <PromptCard data={prompt} />
        {/each}
    </div>
</main>
