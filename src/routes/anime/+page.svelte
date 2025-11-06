<script>
    import { page } from "$app/state";
    import Upvote from "$lib/components/icons/Upvote.svelte";
    import { onMount } from "svelte";

    const q = page.url.searchParams.get("q");
    let anime = null;
    let recommendations = null;
    let notFound = false;

    async function getAnime(q) {
        const res = await fetch(
            `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}`,
        );
        return await res.json();
    }

    async function getRecommendations(mal_id) {
        const res = await fetch(
            `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`,
        );
        return await res.json();
    }

    onMount(async () => {
        const searched = await getAnime(q);
        const found = searched.data?.[0];

        if (!found) {
            notFound = true;
            return;
        }

        const recs = await getRecommendations(found.mal_id);

        anime = found;
        recommendations = [...recs.data];
    });
</script>

<main class="px-5 py-15">
    <!-- HEADER -->
    {#if notFound}
        <div class="text-center space-y-2">
            <h1 class="text-5xl instrument-serif font-bold">Anime not found</h1>
            <p class="opacity-85">Maybe try again?</p>
        </div>
    {:else if !anime}
        <div class="text-center space-y-3 animate-pulse">
            <div class="h-10 w-1/2 mx-auto bg-white/10 rounded"></div>
            <div class="h-5 w-1/3 mx-auto bg-white/10 rounded"></div>
        </div>
    {:else}
        <div class="text-center space-y-2">
            <h1 class="text-5xl instrument-serif font-bold">{anime.title}</h1>
            <p class="opacity-85">View animes similar to {anime.title}</p>
        </div>
    {/if}

    <!-- Results -->
    <section class="flex flex-wrap justify-center items-center gap-3 mt-10">
        {#if notFound}
            <!-- Show nothing below, maybe later add suggestions -->
        {:else if !recommendations}
            <!-- Skeletons -->
            {#each Array(6) as _}
                <div
                    class="bg-white/10 border border-gray-400/20 w-80 p-5 rounded-md space-y-4 animate-pulse"
                >
                    <div class="h-[338px] w-full bg-white/10 rounded-md"></div>
                    <div class="space-y-2">
                        <div class="h-6 w-3/4 bg-white/10 rounded"></div>
                        <div class="h-4 w-1/4 bg-white/10 rounded"></div>
                    </div>
                </div>
            {/each}
        {:else}
            <!-- ⭐ Searched Anime -->
            <a
                href={"https://www.google.com/search?q=" +
                    encodeURIComponent(anime.title + " anime")}
                class="border w-80 p-5 rounded-md space-y-2 bg-pink-300/20 border-pink-500/50 transition"
            >
                <img
                    src={anime.images.webp.image_url}
                    alt={anime.title}
                    class="w-full h-[338px] object-cover rounded-md"
                />
                <div class="mt-5 space-y-1">
                    <h1 class="text-3xl font-bold instrument-serif truncate">
                        {anime.title}
                    </h1>
                    <p class="flex gap-1 items-center opacity-85">
                        What you searched
                    </p>
                </div>
            </a>

            <!-- Recommendations -->
            {#each recommendations as rec}
                <a
                    href={"https://www.google.com/search?q=" +
                        encodeURIComponent(rec.entry.title + " anime")}
                    class="bg-white/10 border border-gray-400/20 w-80 p-5 rounded-md space-y-2 transition"
                >
                    <img
                        src={rec.entry.images.webp.image_url}
                        alt={rec.entry.title}
                        class="w-full h-[338px] object-cover rounded-md"
                    />
                    <div class="mt-5 space-y-1">
                        <h1
                            class="text-3xl font-bold instrument-serif truncate"
                        >
                            {rec.entry.title}
                        </h1>
                        <p class="flex gap-1 items-center opacity-85">
                            <Upvote size={17} />
                            {rec.votes} Votes
                        </p>
                    </div>
                </a>
            {/each}
        {/if}
    </section>
</main>
