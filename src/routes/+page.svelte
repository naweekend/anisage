<script>
    import animes from "$lib/animes/animes";
    import AnimeCard from "$lib/components/AnimeCard.svelte";
    import ShinyButton from "$lib/components/ShinyButton.svelte";
    import { onMount } from "svelte";

    const animeTitles = [
        "Attack on Titan..",
        "Jujutsu Kaisen..",
        "Demon Slayer..",
        "One Piece..",
        "Spy x Family..",
        "Chainsaw Man..",
        "Vinland Saga..",
        "Frieren..",
        "Solo Leveling..",
    ];

    let placeholder = "";
    let i = 0; // title index
    let j = 0; // char index
    let isDeleting = false;

    function type() {
        const current = animeTitles[i];

        if (isDeleting) {
            placeholder = current.substring(0, j - 1);
            j--;
        } else {
            placeholder = current.substring(0, j + 1);
            j++;
        }

        // switch direction
        if (!isDeleting && j === current.length) {
            isDeleting = true;
            setTimeout(type, 1500); // pause at end
            return;
        }
        if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % animeTitles.length;
        }

        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }

    // kick it off
    onMount(() => type());
</script>

<main class="px-5 py-15">
    <div class="max-w-xl mx-auto text-center space-y-5">
        <h1 class="instrument-serif text-5xl font-bold leading-normal">
            Get Anime Recommendations based upon your Favourites
        </h1>

        <form action="/anime" method="GET" class="flex flex-wrap justify-center items-center gap-1">
            <input name="q" id="search" type="text" {placeholder} class="text-xl glass py-3 px-5 max-sm:w-full" />
            <ShinyButton>Search Anime</ShinyButton>
        </form>
    </div>

    <div class="flex flex-col gap-8 mt-15">
        <h1
            class="text-3xl instrument-serif text-center flex justify-center items-center gap-3"
        >
            <div class="bg-green-500 w-2 animate-ping h-2 rounded-full"></div>
            Trending Animes
        </h1>
        <section
            id="animes"
            class="flex flex-wrap justify-center items-center gap-3"
        >
            {#each animes as anime}
                <a href={`/${anime.id}`}>
                    <AnimeCard
                        name={anime.name}
                        image={anime.image}
                        recommendationsCount={anime.recommendationsCount}
                    />
                </a>
            {/each}
        </section>
    </div>
</main>


<style>
    input#search {
        border-radius: 1000px;
    }
</style>