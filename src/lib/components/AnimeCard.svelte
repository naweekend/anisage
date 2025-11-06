<script>
    import Arrow from "./icons/Arrow.svelte";
    import Star from "./icons/Star.svelte";

    let { name, image, recommendationsCount } = $props();
</script>

<div
    class="bg-white/10 border border-gray-400/20 max-sm:w-[calc(100vw-22px)] sm:max-w-80 p-5 rounded-md"
>
    <img
        width={1000}
        height={1500}
        draggable="false"
        class="w-full aspect-10/15 object-cover"
        src={image}
        alt={`${name} cover photo`}
    />
    <div class="mt-5 space-y-1">
        <h1 class="text-3xl font-bold instrument-serif">{name}</h1>
        <p class="opacity-85">{recommendationsCount} recommendations</p>
        <button
            class="group py-2 px-3 w-full bg-pink-900 cursor-pointer active:scale-95 transition-all duration-300 mt-3 rounded-md border border-pink-400 flex justify-between items-center"
        >
            <span class="transition-all duration-300 group-hover:translate-x-2">View Recommendations</span>
            <span class="transition-all duration-300 group-hover:-translate-x-2">
                <Arrow size={15} />
            </span>
        </button>
    </div>
</div>
