<script lang="ts">
  import { deletePromptById, getUserPrompts } from "$lib/api/prompts";
  import { delteModalData, delteModalOpen } from "$lib/stores/modal";
  import { promts, user } from "$lib/stores/shared.svelte";
  import { get } from "svelte/store";

  export let open = false;
  export let title = "Вы уверены?";
  export let description = "Это действие нельзя отменить.";

  async function confirmDelete() {
    if ($delteModalData) {
      let test = get(delteModalData);
      const success = await deletePromptById(
        $delteModalData.id,
        $delteModalData.resultUrl,
        $delteModalData.type,
      );
      if (success) {
        delteModalOpen.set(false);
        const newPromts = await getUserPrompts(user.user.id);
        promts.list = newPromts;
      } else {
        alert("Ошибка удаления");
        delteModalOpen.set(false);
      }
    }
  }
</script>

{#if $delteModalOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
      <h2 class="text-xl font-bold mb-2">{title}</h2>
      <p class="text-gray-600 mb-4">{description}</p>
      <div class="flex justify-end gap-2">
        <button
          class="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
          on:click={() => delteModalOpen.set(false)}
        >
          Отмена
        </button>
        <button
          class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          on:click={confirmDelete}
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
{/if}
