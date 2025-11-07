<script>
    import ShinyButton from "$lib/components/ShinyButton.svelte";
    import { onMount, tick } from "svelte";

    let query = "";
    let suggestions = [];
    let loading = false;
    let timeout;
    let controller;
    let wrapper;
    let form;
    let open = false; // 👈 NEW

    async function fetchSuggestions(q) {
        if (!q.trim()) {
            suggestions = [];
            loading = false;
            open = false; // 👈 hide
            return;
        }

        loading = true;
        open = true; // 👈 show dropdown

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
        }, 250);
    }

    async function choose(title) {
        query = title;
        suggestions = [];
        open = false; // 👈 hide dropdown

        await tick(); // ✅ wait for DOM + bind:value update
        form.submit(); // ✅ modern & correct submit
    }

    function handleKey(e) {
        if (e.key === "Escape") {
            open = false; // 👈 hide dropdown
        }
    }

    function handleClickOutside(e) {
        if (!wrapper.contains(e.target)) {
            open = false; // 👈 hide dropdown
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

        {#if open}
            <ul
                class="absolute w-full bg-black text-white border rounded mt-1 max-h-60 overflow-y-auto z-50 divide-y divide-white/10"
            >
                <!-- Spinner while loading -->
                {#if loading}
                    {#each Array(6) as _}
                        <li class="p-2 flex items-center gap-3 animate-pulse">
                            <div class="w-10 h-14 bg-white/20 rounded"></div>
                            <div class="flex-1 space-y-2">
                                <div
                                    class="h-4 w-3/4 bg-white/10 rounded"
                                ></div>
                                <div
                                    class="h-4 w-1/2 bg-white/10 rounded"
                                ></div>
                            </div>
                        </li>
                    {/each}
                {/if}

                <!-- Actual results -->
                {#if !loading && suggestions.length > 0}
                    {#each suggestions as anime}
                        <li>
                            <button
                                type="button"
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
