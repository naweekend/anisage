import { aotRecommendations } from "./aot";
import { coteRecommendations } from "./cote";
import { deathNoteRecommendations } from "./death-note";
import { demonSlayerRecommendations } from "./demon-slayer";
import { jjkRecommendations } from "./jjk";
import { jojoRecommendations } from "./jojo";
import { narutoRecommendations } from "./naruto";
import { onePieceRecommendations } from "./one-piece";

const animes = [
    {
        id: 1,
        name: "Attack on Titan",
        image: "/images/1.jpg",
        recommendationsCount: aotRecommendations.data.length,
        recommendations: aotRecommendations,
    },
    {
        id: 2,
        name: "One Piece",
        image: "/images/2.jpg",
        recommendationsCount: onePieceRecommendations.data.length,
        recommendations: onePieceRecommendations,
    },
    {
        id: 3,
        name: "Naruto Shippuden",
        image: "/images/3.jpg",
        recommendationsCount: narutoRecommendations.data.length,
        recommendations: narutoRecommendations,
    },
    {
        id: 4,
        name: "Demon Slayer",
        image: "/images/4.jpg",
        recommendationsCount: demonSlayerRecommendations.data.length,
        recommendations: demonSlayerRecommendations,
    },
    {
        id: 5,
        name: "Death Note",
        image: "/images/5.jpg",
        recommendationsCount: deathNoteRecommendations.data.length,
        recommendations: deathNoteRecommendations,
    },
    {
        id: 6,
        name: "Jujutsu Kaisen",
        image: "/images/6.jpg",
        recommendationsCount: jjkRecommendations.data.length,
        recommendations: jjkRecommendations,
    },
    {
        id: 7,
        name: "JoJo",
        image: "/images/7.jpg",
        recommendationsCount: jojoRecommendations.data.length,
        recommendations: jojoRecommendations,
    },
    {
        id: 8,
        name: "COTE",
        image: "/images/8.jpg",
        recommendationsCount: coteRecommendations.data.length,
        recommendations: coteRecommendations,
    }
];

export default animes;
