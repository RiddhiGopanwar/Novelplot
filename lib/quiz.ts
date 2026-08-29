export type Trait =
  | "comfort"
  | "romantic"
  | "mystery"
  | "fantasy"
  | "emotional"
  | "dark"
  | "adventure";

export interface QuizOption {
  id: string;
  text: string;
  trait: Trait;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "What kind of reading night sounds perfect?",
    options: [
      { id: "q1a", text: "Candlelight and a slow-burn romance", trait: "romantic" },
      { id: "q1b", text: "A dark room and an unsolved mystery", trait: "mystery" },
      { id: "q1c", text: "A magical world I never want to leave", trait: "fantasy" },
      { id: "q1d", text: "Something emotional that destroys me", trait: "emotional" },
    ],
  },
  {
    id: "q2",
    prompt: "Pick a book cover that catches your eye.",
    options: [
      { id: "q2a", text: "Two people almost touching hands", trait: "romantic" },
      { id: "q2b", text: "A shadowy figure, a blood-red title", trait: "dark" },
      { id: "q2c", text: "A hand-drawn map and a compass", trait: "adventure" },
      { id: "q2d", text: "A soft cottage in muted, cozy colors", trait: "comfort" },
    ],
  },
  {
    id: "q3",
    prompt: "Your ideal main character is...",
    options: [
      { id: "q3a", text: "Quietly healing from something", trait: "comfort" },
      { id: "q3b", text: "Solving a crime nobody else can crack", trait: "mystery" },
      { id: "q3c", text: "Running from a secret they can't outrun", trait: "dark" },
      { id: "q3d", text: "Falling for exactly the wrong person", trait: "romantic" },
    ],
  },
  {
    id: "q4",
    prompt: "Pick your reading spot.",
    options: [
      { id: "q4a", text: "A blanket fort, tea, and silence", trait: "comfort" },
      { id: "q4b", text: "An enchanted forest at dusk", trait: "fantasy" },
      { id: "q4c", text: "A cliffside with the wind picking up", trait: "adventure" },
      { id: "q4d", text: "Somewhere I can cry without being seen", trait: "emotional" },
    ],
  },
  {
    id: "q5",
    prompt: "Choose your plot twist.",
    options: [
      { id: "q5a", text: "It was love all along", trait: "romantic" },
      { id: "q5b", text: "The narrator was lying the whole time", trait: "mystery" },
      { id: "q5c", text: "Magic was real from page one", trait: "fantasy" },
      { id: "q5d", text: "Everyone I loved is gone by the end", trait: "dark" },
    ],
  },
];

export interface QuizPersonality {
  name: string;
  emoji: string;
  description: string;
}

export const QUIZ_PERSONALITIES: Record<Trait, QuizPersonality> = {
  comfort: {
    name: "The Comfort Reader",
    emoji: "🍵",
    description:
      "You read to feel held. Gentle, familiar stories are your safe place, and you'll reread an old favourite before risking something unsettling.",
  },
  romantic: {
    name: "The Romantic",
    emoji: "💌",
    description:
      "Slow burns, longing looks, and love that almost doesn't happen. You read for the feeling right before two people finally admit it.",
  },
  mystery: {
    name: "The Mystery Seeker",
    emoji: "🔍",
    description:
      "You can't leave a loose thread alone. You're already building theories by chapter two, and you read the last page a little slower on purpose.",
  },
  fantasy: {
    name: "The Fantasy Dreamer",
    emoji: "🪄",
    description:
      "You read to leave. Magic systems, hidden worlds, and maps in the front cover pull you in, and reality can wait until you finish the chapter.",
  },
  emotional: {
    name: "The Emotional Reader",
    emoji: "🌧️",
    description:
      "You want a book that wrecks you a little. If you finish something dry-eyed, you wonder if it was even worth reading.",
  },
  dark: {
    name: "The Dark Story Addict",
    emoji: "🖤",
    description:
      "You're drawn to the shadows on purpose. Morally grey characters, secrets with teeth, and endings that don't tie up too neatly.",
  },
  adventure: {
    name: "The Adventure Seeker",
    emoji: "🗺️",
    description:
      "You read to move. Quests, journeys, and characters who leave home and never quite go back the same. Sitting still is not your genre.",
  },
};

export function computeQuizResult(chosen: QuizOption[]): {
  trait: Trait;
  personality: QuizPersonality;
  reasons: string[];
} {
  const counts: Partial<Record<Trait, number>> = {};
  for (const opt of chosen) {
    counts[opt.trait] = (counts[opt.trait] || 0) + 1;
  }
  let winner: Trait = chosen[0]?.trait || "comfort";
  let best = -1;
  for (const [trait, count] of Object.entries(counts) as [Trait, number][]) {
    if (count > best) {
      best = count;
      winner = trait;
    }
  }
  const reasons = chosen.filter((o) => o.trait === winner).map((o) => o.text);
  return { trait: winner, personality: QUIZ_PERSONALITIES[winner], reasons };
}
