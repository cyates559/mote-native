import levenshteinDistance from "./levenshteinDistance";

export default function levenshteinSort<T>(search: string, space: T[], getText: (item: T) => string = toString) {
  return space.map<[number, T]>(item => {
    const text = getText(item);
    return [levenshteinDistance(search, text) - text.indexOf(search), item];
  })
    .sort(([a], [b]) => a - b)
    .map(([, text]) => text);
}