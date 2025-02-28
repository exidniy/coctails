import { defineStore } from 'pinia';
import type { Cocktail, CocktailCode } from '../types/cocktail';
import { cocktailService } from '../api/cocktailService';

export const useCocktailStore = defineStore('cocktails', {
  state: () => ({
    cocktails: {} as Record<CocktailCode, Cocktail[]>,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getCocktails: (state) => (code: CocktailCode) =>
      state.cocktails[code] || [],
  },

  actions: {
    async fetchCocktails(code: CocktailCode) {
      if (this.cocktails[code]?.length) return;

      this.loading = true;
      try {
        const { drinks } = await cocktailService.getCocktails(code);
        this.cocktails[code] = drinks || [];
      } catch (err) {
        this.error = 'Failed to load cocktails. Please try again.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
