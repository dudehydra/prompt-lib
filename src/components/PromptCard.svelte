<script>
  export let data;
</script>

<div
  class="bg-white rounded-xl shadow p-4 hover:shadow-lg transition flex flex-col justify-between"
>
  <div class="card__header mb-4">
    <a href={`/prompt/${data.id}`} class="block">
      <h2 class="text-lg font-semibold">{data.title}</h2>
      <p class="text-sm text-gray-600 line-clamp-2">{data.prompt}</p>
    </a>
    <p class="text-xs text-gray-400 mt-1 mb-2">🔘 {data.model}</p>
    <div class="flex space-x-2 items-center w-full">
      {#each data.tags as tag}
        <button
          class="inline-flex items-center justify-between space-x-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm"
        >
          {tag}
        </button>
      {/each}
    </div>
  </div>
  <div class="card__main">
    {#if data.type === "image" && data.result_url}
      <img src={data.result_url} alt={data.title} class="rounded-lg mb-2" />
    {/if}
    {#if data.type === "text" && data.result_text}
      <div class="bg-gray-100 rounded-lg p-4 mb-6">
        <h2 class="text-lg font-semibold mb-2">Результат</h2>
        <pre
          class="overflow-hidden text-ellipsis whitespace-nowrap">{data.result_text}</pre>
      </div>
    {/if}
  </div>
  <div class="card__footer">
    <div class="mt-2 flex gap-2 text-sm">
      <button
        on:click={() => navigator.clipboard.writeText(data.prompt)}
        class="bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
      >
        📋 Копировать
      </button>
      {#if data.deeplink}
        <a
          href={data.deeplink}
          target="_blank"
          class="bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
        >
          🚀 Открыть
        </a>
      {/if}
    </div>
  </div>
</div>
