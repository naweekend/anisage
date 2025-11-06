<script>
    import Arrow from "./icons/Arrow.svelte";
    import Star from "./icons/Star.svelte";

    let { name, image, recommendations } = $props();
</script>

<div
    class="bg-white/10 border border-gray-400/20 max-sm:w-[calc(100vw-10px)] sm:min-w-80 p-5 rounded-md"
>
    <img
        draggable="false"
        class="w-full"
        src={image}
        alt={`${name} cover photo`}
    />
    <div class="mt-5 space-y-1">
        <h1 class="text-3xl font-bold instrument-serif">{name}</h1>
        <p class="opacity-85">{recommendations} recommendations</p>
        <button
            class="py-2 px-3 w-full bg-pink-900 cursor-pointer active:scale-95 transition-all duration-250 mt-3 rounded-md border border-pink-400 hover:bg-pink-700 flex gap-2 justify-between items-center"
            >View Recommendations <Arrow size={15} /></button
        >
    </div>
</div>
