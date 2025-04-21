<script lang="ts">
    import { supabase } from "$lib/supabaseClient";

    let email = "";
    let password = "";
    let message = "";

    const register = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            message = "Ошибка: " + error.message;
        } else {
            message = "Регистрация успешна! Проверь почту для подтверждения.";
        }
    };
</script>

<form on:submit|preventDefault={register} class="space-y-3">
    <input
        type="email"
        bind:value={email}
        placeholder="Email"
        required
        class="border p-2 rounded w-full"
    />
    <input
        type="password"
        bind:value={password}
        placeholder="Пароль"
        required
        class="border p-2 rounded w-full"
    />
    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Зарегистрироваться
    </button>
</form>

{#if message}
    <p class="mt-2">{message}</p>
{/if}
