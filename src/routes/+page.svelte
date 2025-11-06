<script>
    import animes from "$lib/animes/animes";
    import AnimeCard from "$lib/components/AnimeCard.svelte";
    import ShinyButton from "$lib/components/ShinyButton.svelte";
</script>

<main class="px-5 py-15">
    <div class="max-w-xl mx-auto text-center space-y-5">
        <h1 class="instrument-serif text-5xl font-bold leading-normal">
            Get Anime Recommendations based upon your Favourites
        </h1>
        <a href="#animes">
            <ShinyButton>View Animes</ShinyButton>
        </a>
    </div>

    <section
        id="animes"
        class="mt-15 flex flex-wrap justify-center items-center gap-5"
    >
        {#each animes as anime}
            <AnimeCard
                name={anime.name}
                image={anime.image}
                recommendations={anime.recommendations}
            />
        {/each}
    </section>
</main>
