// MIT License
// Copyright (c) 2020 Kasper Unn Weihe
// https://github.com/ka-weihe/fastest-levenshtein/

import {myers_32, myers_x} from "./levenshtein";


export default function levenshteinDistance(a: string, b: string): number {
  if (a.length < b.length) {
    const tmp = b;
    b = a;
    a = tmp;
  }
  if (b.length === 0) {
    return a.length;
  }
  if (Math.max(a.length, b.length) <= 32) {
    return myers_32(a, b);
  }
  return myers_x(a, b);
};