<script lang="ts">
    import { onMount } from "svelte";
    import { deletePromptById, getUserPrompts } from "$lib/api/prompts";
    import PromptCard from "../../components/PromptCard.svelte";
    import ConfirmModal from "../../components/ConfirmModal.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { user } from "$lib/stores/shared.svelte";

    let prompts: any[] = [];
    let loading = true;
    let error = "";

    let modalOpen = false;
    let selectedPromptId: string | null = null;
    let selectedResultUrl = "";
    let selectedType = "";
    onMount(async () => {
        if (!user.user) return;
        try {
            prompts = await getUserPrompts(user.user.id);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });
    function askDelete(id: string, resultUrl: string, type: string) {
        selectedPromptId = id;
        selectedResultUrl = resultUrl;
        selectedType = type;
        modalOpen = true;
    }

    async function confirmDelete() {
        if (selectedPromptId) {
            const success = await deletePromptById(
                selectedPromptId,
                selectedResultUrl,
                selectedType,
            );
            if (success) {
                prompts = prompts.filter((p) => p.id !== selectedPromptId);
            } else {
                alert("Ошибка удаления");
            }
        }
        modalOpen = false;
    }

    function cancelDelete() {
        modalOpen = false;
    }
</script>

<ConfirmModal
    bind:open={modalOpen}
    title="Удалить промт?"
    description="После удаления восстановить нельзя."
    onConfirm={confirmDelete}
    onCancel={cancelDelete}
/>
<h1 class="text-2xl font-bold mb-4">Мои промты</h1>

{#if !user.user}
    <p>Пожалуйста, войдите в аккаунт.</p>
{:else if loading}
    <p>Загрузка...</p>
{:else if error}
    <p class="text-red-600">{error}</p>
{:else if prompts.length === 0}
    <p>У вас пока нет сохранённых промтов.</p>
{:else}
    <div class="grid gap-4 md:grid-cols-2">
        {#each prompts as prompt}
            <div>
                <PromptCard data={prompt} />
                <button
                    class="text-red-600 hover:text-red-800 transition"
                    on:click={() =>
                        askDelete(prompt.id, prompt.resultUrl, prompt.type)}
                >
                    🗑
                </button>
            </div>
        {/each}
    </div>
{/if}
