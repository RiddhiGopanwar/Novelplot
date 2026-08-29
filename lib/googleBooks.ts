export interface GoogleBookResult {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  description?: string;
  pageCount?: number;
  genre?: string;
}

interface GoogleVolumeItem {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    pageCount?: number;
    categories?: string[];
    imageLinks?: { thumbnail?: string; smallThumbnail?: string };
  };
}

export async function searchBooks(query: string): Promise<GoogleBookResult[]> {
  if (!query.trim()) return [];
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

  const buildUrl = (country?: string) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}&maxResults=18&printType=books`;
    if (country) url += `&country=${country}`;
    if (apiKey) url += `&key=${apiKey}`;
    return url;
  };

  const fetchItems = async (url: string): Promise<GoogleVolumeItem[]> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Google Books request failed");
    const data = await res.json();
    return data.items || [];
  };

  // The keyless Google Books endpoint sometimes returns zero results
  // depending on the requester's region, even for common searches. Passing
  // an explicit `country` works around this; if that still comes back
  // empty, retry once without it in case the opposite is true for this
  // requester.
  let items = await fetchItems(buildUrl("US"));
  if (items.length === 0) {
    items = await fetchItems(buildUrl());
  }

  return items
    .filter((item) => item.volumeInfo?.title)
    .map((item) => ({
      id: item.id,
      title: item.volumeInfo!.title || "Untitled",
      author: item.volumeInfo!.authors?.join(", ") || "Unknown Author",
      coverUrl: item.volumeInfo!.imageLinks?.thumbnail?.replace("http://", "https://"),
      description: item.volumeInfo!.description,
      pageCount: item.volumeInfo!.pageCount,
      genre: item.volumeInfo!.categories?.[0],
    }));
}
