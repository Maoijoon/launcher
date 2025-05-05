export type Credit = {
  name: string;
  roles?: string[];
}

export type ExtData = {
  score?: number;
  rating?: string;
  views?: number;
  faves?: number;
  credits?: Credit[];
}
