import { Mood, RecommendedBook } from "./types";

export const MOODS: { id: Mood; label: string; emoji: string }[] = [
  { id: "happy", label: "Happy", emoji: "🌼" },
  { id: "sad", label: "Sad", emoji: "🌧️" },
  { id: "anxious", label: "Anxious", emoji: "🍃" },
  { id: "angry", label: "Angry", emoji: "🔥" },
  { id: "romantic", label: "Romantic", emoji: "🌸" },
  { id: "comfort", label: "Comfort", emoji: "🍵" },
  { id: "motivated", label: "Motivated", emoji: "✨" },
  { id: "lonely", label: "Lonely", emoji: "🌙" },
  { id: "adventurous", label: "Adventurous", emoji: "🗺️" },
  { id: "mystery", label: "Need a Mystery", emoji: "🔍" },
];

export const MOOD_RECOMMENDATIONS: Record<Mood, RecommendedBook[]> = {
  happy: [
    { title: "Legends & Lattes", author: "Travis Baldree", genre: "Cozy Fantasy", blurb: "A retired orc mercenary opens a coffee shop. Low stakes, high warmth." },
    { title: "The House in the Cerulean Sea", author: "TJ Klune", genre: "Fantasy", blurb: "A gentle, funny found-family story that feels like sunshine." },
    { title: "Beach Read", author: "Emily Henry", genre: "Romance", blurb: "Two rival writers, one summer, and a lot of banter." },
  ],
  sad: [
    { title: "A Man Called Ove", author: "Fredrik Backman", genre: "Literary Fiction", blurb: "Grumpy on the outside, devastating and tender underneath." },
    { title: "Klara and the Sun", author: "Kazuo Ishiguro", genre: "Science Fiction", blurb: "A quiet, aching story about love and what it means to be needed." },
    { title: "Norwegian Wood", author: "Haruki Murakami", genre: "Literary Fiction", blurb: "Melancholy, nostalgic, and strangely comforting." },
  ],
  anxious: [
    { title: "Piranesi", author: "Susanna Clarke", genre: "Fantasy", blurb: "A slow, meditative world that feels like a held breath." },
    { title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", blurb: "Gentle reassurance wrapped in a thoughtful premise." },
    { title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", genre: "Nature Writing", blurb: "Grounding, slow essays about reciprocity with the earth." },
  ],
  angry: [
    { title: "Gone Girl", author: "Gillian Flynn", genre: "Thriller", blurb: "Let the rage simmer through someone else's chaos." },
    { title: "My Sister, the Serial Killer", author: "Oyinkan Braithwaite", genre: "Thriller", blurb: "Sharp, darkly funny, and satisfyingly biting." },
    { title: "The Southern Book Club's Guide to Slaying Vampires", author: "Grady Hendrix", genre: "Horror", blurb: "Righteous fury with fangs." },
  ],
  romantic: [
    { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", genre: "Romance", blurb: "Old Hollywood glamour and a love story that lingers." },
    { title: "People We Meet on Vacation", author: "Emily Henry", genre: "Romance", blurb: "Slow-burn best friends to something more." },
    { title: "Red, White & Royal Blue", author: "Casey McQuiston", genre: "Romance", blurb: "Witty, warm, and delightfully swoony." },
  ],
  comfort: [
    { title: "Convenience Store Woman", author: "Sayaka Murata", genre: "Literary Fiction", blurb: "Strange, small, and strangely soothing." },
    { title: "The Guernsey Literary and Potato Peel Pie Society", author: "Mary Ann Shaffer", genre: "Historical Fiction", blurb: "Letters, tea, and gentle community." },
    { title: "Chocolat", author: "Joanne Harris", genre: "Magical Realism", blurb: "A cozy village, chocolate, and quiet magic." },
  ],
  motivated: [
    { title: "Atomic Habits", author: "James Clear", genre: "Non-fiction", blurb: "Small systems, real momentum." },
    { title: "Circe", author: "Madeline Miller", genre: "Mythology", blurb: "Watch a woman claim her own power, page by page." },
    { title: "Educated", author: "Tara Westover", genre: "Memoir", blurb: "A memoir about building yourself from nothing." },
  ],
  lonely: [
    { title: "Eleanor Oliphant Is Completely Fine", author: "Gail Honeyman", genre: "Fiction", blurb: "A story about being seen, slowly and gently." },
    { title: "A Little Life", author: "Hanya Yanagihara", genre: "Literary Fiction", blurb: "Devastating, but full of fierce, quiet friendship." },
    { title: "The Ocean at the End of the Lane", author: "Neil Gaiman", genre: "Fantasy", blurb: "A small, strange comfort about being held by something bigger." },
  ],
  adventurous: [
    { title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "Fantasy", blurb: "Sweeping, immersive, and endlessly quotable." },
    { title: "Six of Crows", author: "Leigh Bardugo", genre: "Fantasy", blurb: "A heist crew you'll want to follow anywhere." },
    { title: "The Poppy War", author: "R.F. Kuang", genre: "Fantasy", blurb: "Bold, sweeping, and unafraid of the dark." },
  ],
  mystery: [
    { title: "The Thursday Murder Club", author: "Richard Osman", genre: "Mystery", blurb: "Cozy, witty, and full of heart." },
    { title: "In the Woods", author: "Tana French", genre: "Mystery", blurb: "Atmospheric and hauntingly unresolved." },
    { title: "The Silent Patient", author: "Alex Michaelides", genre: "Thriller", blurb: "A twist you'll want to reread immediately." },
  ],
};
