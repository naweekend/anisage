<script>
    let { children } = $props();
</script>

<button
    class="py-4 px-6 rounded-full backdrop-blur-lg border border-red-500/20 bg-linear-to-tr from-pink-500/60 to-pink-500/40 shadow-lg hover:shadow-2xl shadow-red-500/30 active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer hover:border-pink-700/50 hover:bg-linear-to-tr hover:from-pink-500/30 hover:to-pink-500/40 group relative overflow-hidden text-lg"
>
    <div
        class="absolute inset-0 bg-linear-to-r from-transparent via-red-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
    ></div>
    <div class="relative z-10">
        <p>
            {@render children?.()}
        </p>
    </div>
</button>
