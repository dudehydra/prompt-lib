<script>
  import { base } from "$app/paths";
  export let data;
  const imagePath = `/${data.resultUrl}`;
</script>

<div
  class="bg-white rounded-xl shadow p-4 hover:shadow-lg transition flex flex-col justify-between"
>
  {#if data.type === "image" && data.resultUrl}
    <img src={imagePath} alt={data.title} class="rounded-lg mb-2" />
  {/if}

  <a href={`/prompt/${data.id}`} class="block">
    <h2 class="text-lg font-semibold">{data.title}</h2>
    <p class="text-sm text-gray-600 line-clamp-2">{data.prompt}</p>
  </a>
  <p class="text-xs text-gray-400 mt-1">🔘 {data.model}</p>

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
