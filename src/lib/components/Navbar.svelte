<script>
    import { page } from "$app/state";
</script>

<nav
    class={`border-b glass md:w-200 w-[calc(100vw-30px)] z-999 border-b-gray-400/20 left-1/2 -translate-x-1/2 p-3 flex justify-between items-center
  ${page.url.pathname === "/" ? "fixed top-5" : "absolute top-5"}`}
>
    <a href="/" class="text-3xl instrument-serif">Anisage</a>
    <a href="/#animes" class="text-3xl sm:px-1">🌺</a>
</nav>
