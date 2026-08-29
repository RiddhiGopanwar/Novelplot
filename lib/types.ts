export type ReadingStatus = "currently-reading" | "want-to-read" | "completed";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  status: ReadingStatus;
  currentPage: number;
  totalPages: number;
  rating?: number; // 1-5
  genre?: string;
  notes?: string;
  dateAdded: string; // ISO
  dateCompleted?: string; // ISO
}

export interface Quote {
  id: string;
  text: string;
  book: string;
  author: string;
  page?: number;
  dateAdded: string;
}

export interface Shelf {
  id: string;
  name: string;
  emoji: string;
  bookIds: string[];
}

export type Mood =
  | "happy"
  | "sad"
  | "anxious"
  | "angry"
  | "romantic"
  | "comfort"
  | "motivated"
  | "lonely"
  | "adventurous"
  | "mystery";

export interface RecommendedBook {
  title: string;
  author: string;
  genre: string;
  blurb: string;
}
