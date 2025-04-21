<script lang="ts">
    export let open = false
    export let title = 'Вы уверены?'
    export let description = 'Это действие нельзя отменить.'
    export let onConfirm: () => void
    export let onCancel: () => void
  </script>
  
  {#if open}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 class="text-xl font-bold mb-2">{title}</h2>
        <p class="text-gray-600 mb-4">{description}</p>
        <div class="flex justify-end gap-2">
          <button
            class="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
            on:click={onCancel}>
            Отмена
          </button>
          <button
            class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            on:click={onConfirm}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  {/if}
  