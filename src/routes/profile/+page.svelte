<script lang="ts">
    import { onMount } from "svelte";
    import {
        deletePromptById,
        getSavedPromptsForCurrentUser,
        getUserPrompts,
    } from "$lib/api/prompts";
    import PromptCard from "../../components/PromptCard.svelte";
    import ConfirmModal from "../../components/ConfirmModal.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { savedPromts, user, promts } from "$lib/stores/shared.svelte";
    import {
        Tabs,
        TabsContent,
        TabsList,
        TabsTrigger,
    } from "$lib/components/ui/tabs";

    let loading = true;
    let error = "";
    let activeTab = "my";
    let modalOpen = false;
    onMount(async () => {
        if (!user.user) return;
        try {
            let data = await getUserPrompts(user.user.id);
            promts.list = data;
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });
    $: if (activeTab === "saved") {
        (async () => {
            const promts = await getSavedPromptsForCurrentUser();
            savedPromts.set(promts);
        })();
    }
</script>

<ConfirmModal
    title="Удалить промт?"
    description="После удаления восстановить нельзя."
/>
<h1 class="text-2xl font-bold mb-4">Мои промты</h1>

{#if !user.user}
    <p>Пожалуйста, войдите в аккаунт.</p>
{:else if loading}
    <p>Загрузка...</p>
{:else if error}
    <p class="text-red-600">{error}</p>
{:else if promts.list.length === 0}
    <p>У вас пока нет сохранённых промтов.</p>
{:else}
    <Tabs defaultValue="my" bind:value={activeTab}>
        <TabsList>
            <TabsTrigger value="my">Мои промты</TabsTrigger>
            <TabsTrigger value="saved">Сохранённые</TabsTrigger>
        </TabsList>

        <TabsContent value="my">
            <div class="grid gap-4 md:grid-cols-2">
                {#each promts.list as prompt}
                    <div>
                        <PromptCard data={prompt} />
                    </div>
                {/each}
            </div>
        </TabsContent>
        <TabsContent value="saved">
            <div class="grid gap-4 md:grid-cols-2">
                {#each $savedPromts as prompt}
                    <div>
                        <PromptCard data={prompt} isSaved={true} />
                    </div>
                {/each}
            </div>
        </TabsContent>
    </Tabs>
{/if}
