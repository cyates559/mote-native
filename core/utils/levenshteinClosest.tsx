// MIT License
// Copyright (c) 2020 Kasper Unn Weihe
// https://github.com/ka-weihe/fastest-levenshtein/

import levenshteinDistance from "./levenshteinDistance";

export default function closest(str: string, arr: readonly string[]): string {
  let min_distance = Infinity;
  let min_index = 0;
  for (let i = 0; i < arr.length; i++) {
    const dist = levenshteinDistance(str, arr[i]);
    if (dist < min_distance) {
      min_distance = dist;
      min_index = i;
    }
  }
  return arr[min_index];
}
