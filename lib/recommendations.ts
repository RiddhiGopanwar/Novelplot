export interface RecBook {
  title: string;
  author: string;
}

export interface RecCategory {
  id: string;
  label: string;
  emoji: string;
  books: RecBook[];
}

// Real, published books only. Descriptions, covers, and other metadata are
// never invented here, they're looked up live via Google Books when a user
// clicks through to Discover for the exact title.
export const RECOMMENDATION_CATEGORIES: RecCategory[] = [
  {
    id: "dark-romance",
    label: "Dark Romance",
    emoji: "🖤",
    books: [
      { title: "Haunting Adeline", author: "H. D. Carlton" },
      { title: "The Predator", author: "H. D. Carlton" },
      { title: "The Syndicate", author: "Sophie Lark" },
      { title: "Twisted Love", author: "Ana Huang" },
      { title: "Corrupt", author: "Penelope Douglas" },
      { title: "Verity", author: "Colleen Hoover" },
    ],
  },
  {
    id: "soft-romance",
    label: "Soft Romance",
    emoji: "🌸",
    books: [
      { title: "Better Than the Movies", author: "Lynn Painter" },
      { title: "Beach Read", author: "Emily Henry" },
      { title: "The Hating Game", author: "Sally Thorne" },
      { title: "People We Meet on Vacation", author: "Emily Henry" },
      { title: "Red, White & Royal Blue", author: "Casey McQuiston" },
      { title: "Book Lovers", author: "Emily Henry" },
    ],
  },
  {
    id: "mystery",
    label: "Mystery",
    emoji: "🔍",
    books: [
      { title: "The Thursday Murder Club", author: "Richard Osman" },
      { title: "In the Woods", author: "Tana French" },
      { title: "And Then There Were None", author: "Agatha Christie" },
      { title: "The Cuckoo's Calling", author: "Robert Galbraith" },
      { title: "Big Little Lies", author: "Liane Moriarty" },
      { title: "The Guest List", author: "Lucy Foley" },
    ],
  },
  {
    id: "psychological-thriller",
    label: "Psychological Thriller",
    emoji: "🌀",
    books: [
      { title: "The Silent Patient", author: "Alex Michaelides" },
      { title: "Gone Girl", author: "Gillian Flynn" },
      { title: "The Girl on the Train", author: "Paula Hawkins" },
      { title: "Sharp Objects", author: "Gillian Flynn" },
      { title: "My Sister, the Serial Killer", author: "Oyinkan Braithwaite" },
      { title: "Behind Closed Doors", author: "B. A. Paris" },
    ],
  },
  {
    id: "fantasy",
    label: "Fantasy",
    emoji: "🐉",
    books: [
      { title: "The Name of the Wind", author: "Patrick Rothfuss" },
      { title: "A Court of Thorns and Roses", author: "Sarah J. Maas" },
      { title: "The Poppy War", author: "R. F. Kuang" },
      { title: "Mistborn", author: "Brandon Sanderson" },
      { title: "Six of Crows", author: "Leigh Bardugo" },
      { title: "The Priory of the Orange Tree", author: "Samantha Shannon" },
    ],
  },
  {
    id: "fairy-magical-fantasy",
    label: "Fairy / Magical Fantasy",
    emoji: "🧚",
    books: [
      { title: "The Cruel Prince", author: "Holly Black" },
      { title: "Uprooted", author: "Naomi Novik" },
      { title: "The Ten Thousand Doors of January", author: "Alix E. Harrow" },
      { title: "Spinning Silver", author: "Naomi Novik" },
      { title: "The Night Circus", author: "Erin Morgenstern" },
      { title: "A Deadly Education", author: "Naomi Novik" },
    ],
  },
  {
    id: "enemies-to-lovers",
    label: "Enemies to Lovers",
    emoji: "⚔️",
    books: [
      { title: "The Hating Game", author: "Sally Thorne" },
      { title: "Powerless", author: "Lauren Roberts" },
      { title: "From Blood and Ash", author: "Jennifer L. Armentrout" },
      { title: "Icebreaker", author: "Hannah Grace" },
      { title: "A Court of Thorns and Roses", author: "Sarah J. Maas" },
      { title: "Twisted Games", author: "Ana Huang" },
    ],
  },
  {
    id: "slow-burn",
    label: "Slow Burn",
    emoji: "🕯️",
    books: [
      { title: "The Song of Achilles", author: "Madeline Miller" },
      { title: "Pride and Prejudice", author: "Jane Austen" },
      { title: "Outlander", author: "Diana Gabaldon" },
      { title: "The Statistical Probability of Love at First Sight", author: "Jennifer E. Smith" },
      { title: "Legends & Lattes", author: "Travis Baldree" },
      { title: "Emergency Contact", author: "Mary H. K. Choi" },
    ],
  },
  {
    id: "coming-of-age",
    label: "Coming of Age",
    emoji: "🌱",
    books: [
      { title: "The Perks of Being a Wallflower", author: "Stephen Chbosky" },
      { title: "Eleanor & Park", author: "Rainbow Rowell" },
      { title: "The Catcher in the Rye", author: "J. D. Salinger" },
      { title: "Speak", author: "Laurie Halse Anderson" },
      { title: "Aristotle and Dante Discover the Secrets of the Universe", author: "Benjamin Alire Saenz" },
      { title: "I'll Give You the Sun", author: "Jandy Nelson" },
    ],
  },
  {
    id: "comfort-reads",
    label: "Comfort Reads",
    emoji: "🍵",
    books: [
      { title: "Legends & Lattes", author: "Travis Baldree" },
      { title: "The House in the Cerulean Sea", author: "TJ Klune" },
      { title: "A Man Called Ove", author: "Fredrik Backman" },
      { title: "Convenience Store Woman", author: "Sayaka Murata" },
      { title: "The Guernsey Literary and Potato Peel Pie Society", author: "Mary Ann Shaffer" },
      { title: "Anne of Green Gables", author: "L. M. Montgomery" },
    ],
  },
  {
    id: "sad-girl-reads",
    label: "Sad Girl Reads",
    emoji: "🌧️",
    books: [
      { title: "A Little Life", author: "Hanya Yanagihara" },
      { title: "Norwegian Wood", author: "Haruki Murakami" },
      { title: "It Ends with Us", author: "Colleen Hoover" },
      { title: "The Bell Jar", author: "Sylvia Plath" },
      { title: "Me Before You", author: "Jojo Moyes" },
      { title: "Klara and the Sun", author: "Kazuo Ishiguro" },
    ],
  },
  {
    id: "feel-good-reads",
    label: "Feel-Good Reads",
    emoji: "☀️",
    books: [
      { title: "The House in the Cerulean Sea", author: "TJ Klune" },
      { title: "Beach Read", author: "Emily Henry" },
      { title: "Eleanor Oliphant Is Completely Fine", author: "Gail Honeyman" },
      { title: "Legends & Lattes", author: "Travis Baldree" },
      { title: "The Rosie Project", author: "Graeme Simsion" },
      { title: "Anxious People", author: "Fredrik Backman" },
    ],
  },
  {
    id: "dark-academia",
    label: "Dark Academia",
    emoji: "📚",
    books: [
      { title: "The Secret History", author: "Donna Tartt" },
      { title: "If We Were Villains", author: "M. L. Rio" },
      { title: "Ninth House", author: "Leigh Bardugo" },
      { title: "The Atlas Six", author: "Olivie Blake" },
      { title: "A Deadly Education", author: "Naomi Novik" },
      { title: "Piranesi", author: "Susanna Clarke" },
    ],
  },
  {
    id: "adventure",
    label: "Adventure",
    emoji: "🗺️",
    books: [
      { title: "The Name of the Wind", author: "Patrick Rothfuss" },
      { title: "Six of Crows", author: "Leigh Bardugo" },
      { title: "Treasure Island", author: "Robert Louis Stevenson" },
      { title: "The Hobbit", author: "J. R. R. Tolkien" },
      { title: "Percy Jackson and the Olympians: The Lightning Thief", author: "Rick Riordan" },
      { title: "The Poppy War", author: "R. F. Kuang" },
    ],
  },
  {
    id: "historical-fiction",
    label: "Historical Fiction",
    emoji: "🕰️",
    books: [
      { title: "All the Light We Cannot See", author: "Anthony Doerr" },
      { title: "The Book Thief", author: "Markus Zusak" },
      { title: "The Nightingale", author: "Kristin Hannah" },
      { title: "Pachinko", author: "Min Jin Lee" },
      { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid" },
      { title: "Outlander", author: "Diana Gabaldon" },
    ],
  },
  {
    id: "ya",
    label: "YA",
    emoji: "🎒",
    books: [
      { title: "The Fault in Our Stars", author: "John Green" },
      { title: "Six of Crows", author: "Leigh Bardugo" },
      { title: "The Hunger Games", author: "Suzanne Collins" },
      { title: "Eleanor & Park", author: "Rainbow Rowell" },
      { title: "Aristotle and Dante Discover the Secrets of the Universe", author: "Benjamin Alire Saenz" },
      { title: "Powerless", author: "Lauren Roberts" },
    ],
  },
  {
    id: "popular-right-now",
    label: "Popular Right Now",
    emoji: "🔥",
    books: [
      { title: "Fourth Wing", author: "Rebecca Yarros" },
      { title: "Icebreaker", author: "Hannah Grace" },
      { title: "It Ends with Us", author: "Colleen Hoover" },
      { title: "Happy Place", author: "Emily Henry" },
      { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid" },
      { title: "Powerless", author: "Lauren Roberts" },
    ],
  },
  {
    id: "hidden-gems",
    label: "Hidden Gems",
    emoji: "💎",
    books: [
      { title: "Piranesi", author: "Susanna Clarke" },
      { title: "Convenience Store Woman", author: "Sayaka Murata" },
      { title: "The Ten Thousand Doors of January", author: "Alix E. Harrow" },
      { title: "Legends & Lattes", author: "Travis Baldree" },
      { title: "If We Were Villains", author: "M. L. Rio" },
      { title: "My Sister, the Serial Killer", author: "Oyinkan Braithwaite" },
    ],
  },
  {
    id: "obsess-over",
    label: "Books You Might Obsess Over",
    emoji: "✨",
    books: [
      { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid" },
      { title: "Fourth Wing", author: "Rebecca Yarros" },
      { title: "A Court of Thorns and Roses", author: "Sarah J. Maas" },
      { title: "The Song of Achilles", author: "Madeline Miller" },
      { title: "Verity", author: "Colleen Hoover" },
      { title: "Haunting Adeline", author: "H. D. Carlton" },
    ],
  },
];
