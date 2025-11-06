/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const q = url.searchParams.get('q');
    
    const anime = await getAnime(q);
    const recommendations = await getRecommendations(anime.data.mal_id);
    
    return {};
};

const getAnime = async (q) => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${q}`)
    const data = await res.json()
    return data
}

const getRecommendations = async (mal_id) => {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}/recommendations`)
    const data = await res.json()
    return data
}