<script>
    import ShinyButton from "$lib/components/ShinyButton.svelte";
    import { onMount } from "svelte";

    let query = "";
    let suggestions = [];
    let loading = false;
    let timeout;
    let controller;
    let wrapper;
    let form;

    async function fetchSuggestions(q) {
        if (!q.trim()) {
            suggestions = [];
            loading = false;
            return;
        }

        loading = true;

        if (controller) controller.abort();
        controller = new AbortController();

        const res = await fetch(
            `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=6`,
            { signal: controller.signal },
        );

        const data = await res.json();
        suggestions = data.data ?? [];
        loading = false;
    }

    function handleInput(e) {
        query = e.target.value;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fetchSuggestions(query);
        }, 300);
    }

    function choose(title) {
        query = title;
        suggestions = [];
        form.submit();
    }

    function handleKey(e) {
        if (e.key === "Escape") suggestions = [];
    }

    function handleClickOutside(e) {
        if (!wrapper.contains(e.target)) {
            suggestions = [];
        }
    }

    onMount(() => {
        document.addEventListener("keydown", handleKey);
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.removeEventListener("click", handleClickOutside);
        };
    });
</script>

<form
    bind:this={form}
    action="/anime"
    autocomplete="off"
    method="GET"
    class="flex flex-wrap justify-center items-center gap-1 w-full"
>
    <div class="relative max-sm:w-full" bind:this={wrapper}>
        <input
            autocomplete="off"
            name="q"
            id="search"
            required
            type="text"
            bind:value={query}
            oninput={handleInput}
            placeholder="Search anime..."
            class="text-xl glass py-3 px-5 w-full rounded-full"
        />

        {#if query.trim()}
            <ul
                class="absolute w-full bg-black text-white border rounded mt-1 max-h-60 overflow-y-auto z-50 divide-y divide-white/10"
            >
                <!-- Spinner while loading -->
                {#if loading}
                    <li class="p-3 text-center opacity-80">
                        <span
                            class="animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                        ></span>
                    </li>
                {/if}

                <!-- Actual results -->
                {#if !loading && suggestions.length > 0}
                    {#each suggestions as anime}
                        <li>
                            <button
                                class="flex w-full items-center justify-between p-2 cursor-pointer"
                                onclick={() => choose(anime.title)}
                            >
                                <div class="flex items-center gap-3">
                                    <img
                                        src={anime.images.jpg.image_url}
                                        alt={anime.title}
                                        class="w-10 h-14 object-cover rounded"
                                    />
                                    <span>{anime.title}</span>
                                </div>
                            </button>
                        </li>
                    {/each}
                {/if}

                <!-- No results found -->
                {#if !loading && suggestions.length === 0}
                    <li class="p-3 text-center opacity-70">No results found</li>
                {/if}
            </ul>
        {/if}
    </div>

    <ShinyButton>Search Anime</ShinyButton>
</form>

<style>
    input#search {
        border-radius: 1000px;
    }
</style>
