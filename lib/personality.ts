import { Book } from "./types";

export interface Personality {
  name: string;
  emoji: string;
  description: string;
}

const PERSONALITIES: Record<string, Personality> = {
  dreamer: {
    name: "The Dreamer",
    emoji: "🌙",
    description:
      "You read to slip into other worlds. Fantasy and magical realism call to you, and you're the one who dog-ears the page with the prettiest sentence.",
  },
  explorer: {
    name: "The Explorer",
    emoji: "🧭",
    description:
      "Your shelves span genres, eras, and moods. You'll try almost anything once, and your 'want to read' list is a map of everywhere you're headed next.",
  },
  romantic: {
    name: "The Romantic",
    emoji: "🌸",
    description:
      "Slow burns, letters, longing looks across crowded rooms. You're here for the feelings, and you rate books by how hard they made your heart ache.",
  },
  detective: {
    name: "The Detective",
    emoji: "🔍",
    description:
      "You can't resist a puzzle. Mysteries and thrillers are your comfort genre, and you're already three theories deep by chapter two.",
  },
  scholar: {
    name: "The Scholar",
    emoji: "📚",
    description:
      "You read to understand. Non-fiction, memoir, and dense literary fiction don't scare you, you take notes, and you finish what you start.",
  },
  comfort: {
    name: "The Comfort Reader",
    emoji: "🍵",
    description:
      "You return to gentle stories the way other people return to a favourite mug. Cozy, familiar, and always a little bit healing.",
  },
};

export function computePersonality(books: Book[]): Personality {
  const completed = books.filter((b) => b.status === "completed");
  if (completed.length === 0) return PERSONALITIES.explorer;

  const genreCounts: Record<string, number> = {};
  for (const b of completed) {
    const g = (b.genre || "Fiction").toLowerCase();
    genreCounts[g] = (genreCounts[g] || 0) + 1;
  }
  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
  const genreVariety = Object.keys(genreCounts).length;
  const avgRating =
    completed.reduce((sum, b) => sum + (b.rating || 0), 0) / completed.length;

  if (genreVariety >= 4) return PERSONALITIES.explorer;
  if (/fantasy|magical/.test(topGenre)) return PERSONALITIES.dreamer;
  if (/romance/.test(topGenre)) return PERSONALITIES.romantic;
  if (/mystery|thriller|crime/.test(topGenre)) return PERSONALITIES.detective;
  if (/non-fiction|memoir|history|biography/.test(topGenre)) return PERSONALITIES.scholar;
  if (avgRating >= 4.3) return PERSONALITIES.comfort;
  return PERSONALITIES.explorer;
}
