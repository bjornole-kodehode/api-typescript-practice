export type CharacterType = {
  name: string;
  image: string;
  gender: string;
  species: string;
  cost: Cost;
};

export enum Cost {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
}

export type SelectedType = "cost" | "name";
