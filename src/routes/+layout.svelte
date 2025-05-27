<script>
    import AuthModal from "./../components/AuthModal.svelte";
    import AddPromptModal from "../components/AddPromptModal.svelte";

    import { goto } from "$app/navigation";
    import { openAuth } from "$lib/stores/modal";
    import { supabase } from "$lib/supabaseClient";
    import { user } from "$lib/stores/shared.svelte";
    import { onMount } from "svelte";

    let { children } = $props();
    async function handleLogout() {
        await supabase.auth.signOut();
        goto("/"); // можно обновить или перенаправить
    }
    onMount(async () => {
        const { data } = await supabase.auth.getUser();
        user.set(data.user);

        // Подписка на изменения авторизации
        supabase.auth.onAuthStateChange((_event, session) => {
            user.set(session?.user || null);
        });
    });
</script>

<header class="flex gap-4 flex-row-reverse m-2">
    {#if $user}
        <button on:click={handleLogout} class="text-red-600 underline"
            >Выйти</button
        >
        <a href={`/profile`} class="text-red-600 underline">Профиль </a>
    {:else}
        <div class="flex gap-4">
            <button
                on:click={() => openAuth("login")}
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Войти</button
            >
            <button
                on:click={() => openAuth("register")}
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Регистрация</button
            >
        </div>
    {/if}
    <AuthModal />
</header>
<main class="max-w-5xl mx-auto px-4 py-8">
    {@render children()}
</main>
