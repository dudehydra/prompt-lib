<script lang="ts">
  import { authModalOpen, authMode, closeAuth } from "$lib/stores/modal";
  import { supabase } from "$lib/supabaseClient";
  import { user } from "$lib/stores/shared.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let error = "";

  $: authModalOpen.subscribe((val) => ($authModalOpen = val));
  $: authMode.subscribe((val) => ($authMode = val));

  async function handleSubmit() {
    error = "";
    try {
      if ($authMode === "login") {
        const { error: err, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
        else {
          user.user = data.user;
        }
      } else if ($authMode === "register") {
        const { error: err, data } = await supabase.auth.signUp({
          email,
          password,
        });
        if (err) throw err;
      }
      closeAuth();
      goto("/");
    } catch (e) {
      error = e.message;
    }
  }
</script>

{#if $authModalOpen}
  <div
    class="fixed inset-0 bg-stone-500/40 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-md relative">
      <h2 class="text-xl font-semibold mb-4">
        {#if $authMode === "login"}Вход{:else}Регистрация{/if}
      </h2>

      <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-3">
        <input
          type="email"
          bind:value={email}
          placeholder="Email"
          class="border p-2 rounded"
          required
        />
        <input
          type="password"
          bind:value={password}
          placeholder="Пароль"
          class="border p-2 rounded"
          required
        />

        {#if error}
          <p class="text-red-600 text-sm">{error}</p>
        {/if}

        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {#if $authMode === "login"}Войти{:else}Зарегистрироваться{/if}
        </button>
      </form>

      <button
        on:click={closeAuth}
        class="absolute top-2 right-2 text-gray-500 hover:text-black">✕</button
      >
    </div>
  </div>
{/if}
