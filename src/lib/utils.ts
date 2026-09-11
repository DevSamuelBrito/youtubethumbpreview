export function generateId(): string {
  return crypto.randomUUID();
}

export function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
];

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generateLoremText(): string {
  const sentenceCount = 1 + Math.floor(Math.random() * 3);
  const sentences: string[] = [];

  for (let i = 0; i < sentenceCount; i++) {
    const wordCount = 6 + Math.floor(Math.random() * 12);
    const words = Array.from(
      { length: wordCount },
      () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)],
    );
    sentences.push(`${capitalize(words.join(" "))}.`);
  }

  return sentences.join(" ");
}
