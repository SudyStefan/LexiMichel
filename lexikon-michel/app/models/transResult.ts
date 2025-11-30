export enum WordClass {
  N = "Noun",
  V = "Verb",
  A = "Adjective",
  U = ""
}

export enum WordGender {
  M = "Masculine",
  F = "Feminine",
  N = "Neutral",
  U = ""
}

export type TransResult = {
  originalWord: string,
  description: string,
  class: WordClass,
  gender?: WordGender 
  provider: string,
}