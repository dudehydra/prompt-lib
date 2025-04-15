<script lang="ts">
    import { base } from "$app/paths";
    export let data;
    const { prompt } = data;
    const imagePath = `/${prompt.resultUrl}`;
</script>

<svelte:head>
    <title>{prompt.title} — PromptLib</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">{prompt.title}</h1>
    <p class="text-sm text-gray-500 mb-2">Модель: {prompt.model}</p>
    <div class="mb-4">
        <span class="text-sm text-gray-700">Тип: {prompt.type}</span>
        {#if prompt.tags}
            <div class="mt-1 flex flex-wrap gap-2">
                {#each prompt.tags as tag}
                    <span class="bg-gray-200 text-xs px-2 py-1 rounded"
                        >{tag}</span
                    >
                {/each}
            </div>
        {/if}
    </div>

    <div class="bg-gray-100 rounded-lg p-4 mb-6">
        <h2 class="text-lg font-semibold mb-2">Промпт</h2>
        <pre class="whitespace-pre-wrap">{prompt.prompt}</pre>
    </div>

    {#if prompt.type === "text" && prompt.resultText}
        <div class="bg-gray-100 rounded-lg p-4 mb-6">
            <h2 class="text-lg font-semibold mb-2">Результат</h2>
            <pre class="whitespace-pre-wrap">{prompt.resultText}</pre>
        </div>
    {/if}

    {#if prompt.type === "image" && prompt.resultUrl}
        <img
            src={imagePath}
            alt={prompt.title}
            class="rounded-xl shadow mb-6"
        />
    {/if}

    {#if prompt.type === "code"}
        <div class="bg-black text-white font-mono p-4 rounded mb-6 text-sm">
            <pre>// Тут может быть пример кода...</pre>
        </div>
    {/if}

    <div class="flex gap-3">
        <button
            on:click={() => navigator.clipboard.writeText(prompt.prompt)}
            class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
        >
            📋 Копировать промпт
        </button>
        {#if prompt.deeplink}
            <a
                href={prompt.deeplink}
                target="_blank"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
            >
                🚀 Перейти в модель
            </a>
        {/if}
    </div>
</div>
