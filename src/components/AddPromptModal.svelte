<script lang="ts">
    import { promts } from "$lib/stores/shared.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    let showModal = false;

    let title = "";
    let prompt = "";
    let model = "";
    let type = "text";
    let tags = "";
    let deeplink = "";
    let resultText = "";
    let resultUrl = "";
    let imageFile: File | null = null;

    onMount(async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
    });

    async function handleImageUpload() {
        if (!imageFile) return;

        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `user-uploads/${fileName}`;

        const { error } = await supabase.storage
            .from("images")
            .upload(filePath, imageFile, {
                cacheControl: "3600",
                upsert: false,
            });

        if (!error) {
            const { data } = supabase.storage
                .from("images")
                .getPublicUrl(filePath);
            resultUrl = data.publicUrl;
        } else {
            alert("Ошибка загрузки изображения");
        }
    }

    const addPrompt = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        if (type === "image" && imageFile) {
            await handleImageUpload();
        }

        const { error } = await supabase.from("prompts").insert({
            user_id: user.id,
            title,
            input: prompt,
            model,
            type,
            tags: tags.split(",").map((t) => t.trim().toLowerCase()),
            deeplink,
            result_text: resultText,
            result_url: resultUrl,
        });

        if (!error) {
            showModal = false;
            title =
                prompt =
                model =
                tags =
                deeplink =
                resultText =
                resultUrl =
                    "";
            imageFile = null;
            type = "text";

            const { data } = await supabase
                .from("prompts")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            promts.list = data || [];
        } else {
            alert("Ошибка: " + error.message);
        }
    };
</script>

<!-- Кнопка -->
<button
    class="bg-blue-600 text-white px-4 py-2 rounded mb-4"
    on:click={() => (showModal = true)}
>
    ➕ Добавить промпт
</button>
<!-- Модалка -->
{#if showModal}
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
        <div class="bg-white p-6 rounded shadow w-full max-w-xl space-y-3">
            <h2 class="text-xl font-bold">Добавить промпт</h2>

            <input
                class="w-full border p-2 rounded"
                bind:value={title}
                placeholder="Заголовок"
            />
            <textarea
                class="w-full border p-2 rounded"
                bind:value={prompt}
                placeholder="Промпт"
                rows="2"
            />
            <input
                class="w-full border p-2 rounded"
                bind:value={model}
                placeholder="Модель"
            />

            <select class="w-full border p-2 rounded" bind:value={type}>
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="code">Code</option>
            </select>

            {#if type === "text"}
                <textarea
                    class="w-full border p-2 rounded"
                    bind:value={resultText}
                    placeholder="Результат (текст)"
                    rows="3"
                />
            {:else if type === "image"}
                <input
                    type="file"
                    class="w-full border p-2 rounded"
                    on:change={(e) => {
                        let file = (e.target as HTMLInputElement).files;
                        if (file) imageFile = file[0];
                    }}
                />
                {#if resultUrl}
                    <img
                        src={resultUrl}
                        alt="preview"
                        class="mt-2 max-w-xs rounded"
                    />
                {/if}
            {/if}

            <input
                class="w-full border p-2 rounded"
                bind:value={tags}
                placeholder="Теги через запятую"
            />
            <input
                class="w-full border p-2 rounded"
                bind:value={deeplink}
                placeholder="Deeplink (ссылка на prompt)"
            />

            <div class="flex justify-end gap-2 pt-4">
                <button
                    on:click={() => (showModal = false)}
                    class="px-3 py-1 border rounded">Отмена</button
                >
                <button
                    on:click={addPrompt}
                    class="px-3 py-1 bg-blue-600 text-white rounded"
                    >Добавить</button
                >
            </div>
        </div>
    </div>
{/if}
