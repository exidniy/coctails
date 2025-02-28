import axios from "axios";
import type { CocktailCode, CocktailsResponse } from "@/types/cocktail";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

export const cocktailService = {
  async getCocktails(code: CocktailCode): Promise<CocktailsResponse> {
    try {
      const response = await axios.get<CocktailsResponse>(
        `${BASE_URL}/search.php?s=${code}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching cocktails for ${code}:`, error);
      throw error;
    }
  },
};
