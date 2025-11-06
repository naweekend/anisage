<script>
    import animes from "$lib/animes/animes.js";
    import AnimeCard from "$lib/components/AnimeCard.svelte";
    import Upvote from "$lib/components/icons/Upvote.svelte";
    import { redirect } from "@sveltejs/kit";

    const { params } = $props();
    const { id } = params;

    const anime = animes[id - 1];
    const recommendations = anime.recommendations.data;
</script>

<main class="px-5 py-15">
    <div class="text-center space-y-2">
        <h1 class="text-5xl instrument-serif font-bold">{anime.name}</h1>
        <p class="opacity-85">View animes similar to {anime.name}</p>
    </div>

    <section
        id="recommendations"
        class="flex flex-wrap justify-center items-center gap-3 mt-10"
    >
        {#each recommendations as rec}
            <a
                href={"https://www.google.com/search?q=" +
                    encodeURIComponent(rec.entry.title + " anime")}
            >
                <div
                    class="bg-white/10 border border-gray-400/20 w-80 max-sm:w-80 p-5 rounded-md space-y-2"
                >
                    <div class="sm:w-fit h-100 overflow-hidden rounded-md">
                        <img
                            width={225}
                            height={338}
                            src={rec.entry.images.webp.image_url}
                            loading="lazy"
                            alt={rec.entry.title}
                            class="w-full h-full object-cover"
                            draggable="false"
                        />
                    </div>

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
                </div>
            </a>
        {/each}
    </section>
</main>
