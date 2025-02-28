export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string | null;
  strInstructionsDE: string | null;
  strInstructionsFR: string | null;
  strInstructionsIT: string | null;
  strInstructionsZH_HANS: string | null;
  strInstructionsZH_HANT: string | null;
  strDrinkThumb: string;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

export interface CocktailsResponse {
  drinks: Cocktail[] | null;
}

export type CocktailCode = 'margarita' | 'mojito' | 'a1' | 'kir';

export const COCKTAIL_CODES: CocktailCode[] = [
  'margarita',
  'mojito',
  'a1',
  'kir',
];
