<script lang="ts">
    export let allTags: string[] = [];
    export let selectedTags: string[] = [];
    export let onChange: (tags: string[]) => void;

    function toggleTag(tag: string) {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];
        onChange(newTags);
    }
</script>

<div class="flex flex-wrap gap-2 mb-4">
    {#each allTags as tag}
        <button
            class={`px-3 py-1 rounded-full border 
                ${
                    selectedTags.includes(tag)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                }`}
            on:click={() => toggleTag(tag)}
        >
            #{tag}
        </button>
    {/each}
</div>
