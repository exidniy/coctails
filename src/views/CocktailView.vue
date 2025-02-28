<template>
  <div class="cocktail-view">
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <button class="menu-btn" @click="toggleMenu">
        {{ isMenuOpen ? '✕' : '☰' }}
      </button>

      <nav :class="{ 'is-open': isMenuOpen }">
        <router-link
          v-for="code in COCKTAIL_CODES"
          :key="code"
          :to="`/${code}`"
          :class="{ active: code === currentCode }"
          @click="closeMenu"
        >
          {{ formatName(code) }}
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main">
      <div v-if="isLoading" class="status-message">Loading cocktails...</div>

      <div v-else-if="error" class="status-message error">
        {{ error }}
      </div>

      <div v-else class="cocktails">
        <article
          v-for="cocktail in cocktails"
          :key="cocktail.idDrink"
          class="cocktail-card"
        >
          <div class="details">
            <h2>{{ cocktail.strDrink }}</h2>

            <div class="tags">
              <span>{{ cocktail.strCategory }}</span>
              <span>{{ cocktail.strAlcoholic }}</span>
              <span>{{ cocktail.strGlass }}</span>
            </div>

            <section class="recipe">
              <h3>Instructions</h3>
              <p>{{ cocktail.strInstructions }}</p>
            </section>

            <section class="ingredients">
              <h3>Ingredients</h3>
              <ul>
                <li v-for="item in getIngredients(cocktail)" :key="item.name">
                  {{ item.measure }} {{ item.name }}
                </li>
              </ul>
            </section>
          </div>

          <div class="image">
            <div class="image-wrapper">
              <div v-show="!isImageLoaded" class="placeholder" />
              <img
                v-if="cocktail.strDrinkThumb"
                :src="cocktail.strDrinkThumb"
                :alt="cocktail.strDrink"
                loading="lazy"
                :class="{ loaded: isImageLoaded }"
                @load="onImageLoad"
              />
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useCocktailStore } from '../stores/cocktailStore';
import { COCKTAIL_CODES } from '../types/cocktail';
import type { CocktailCode, Cocktail } from '../types/cocktail';

// Props
const props = defineProps<{
  code: CocktailCode;
}>();

// Store
const store = useCocktailStore();
const { loading: isLoading, error } = storeToRefs(store);

// State
const isMenuOpen = ref(false);
const isImageLoaded = ref(false);

// Computed
const currentCode = computed(() => props.code);
const cocktails = computed(() => store.getCocktails(props.code));

// Methods
const formatName = (code: string) => {
  return code.charAt(0).toUpperCase() + code.slice(1);
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const onImageLoad = () => {
  isImageLoaded.value = true;
};

const getIngredients = (cocktail: Cocktail) => {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const name = cocktail[`strIngredient${i}`];
    if (name) {
      ingredients.push({
        name,
        measure: cocktail[`strMeasure${i}`] || '',
      });
    }
  }

  return ingredients;
};

// Lifecycle
const loadData = () => {
  store.fetchCocktails(props.code);
};

watch(currentCode, loadData);
onMounted(loadData);
</script>

<style lang="scss" scoped>
.cocktail-view {
  display: flex;
  min-height: 100vh;
  max-width: 1024px;
  min-width: 360px;
  margin: 0 auto;
}

.sidebar {
  width: 200px;
  background: #fff;
  border-right: 1px solid #eee;
  flex-shrink: 0;

  .menu-btn {
    display: none;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 10;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 4px;
    background: #3498db;
    color: white;
    font-size: 24px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #2980b9;
    }
  }

  nav {
    position: sticky;
    top: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    a {
      padding: 12px 16px;
      border-radius: 4px;
      color: #333;
      text-decoration: none;
      background: #f5f5f5;
      transition: all 0.2s;

      &.active {
        background: #3498db;
        color: white;
      }

      &:hover:not(.active) {
        background: #eee;
      }
    }
  }
}

.main {
  flex: 1;
  padding: 16px;
  min-width: 0;
}

.status-message {
  text-align: center;
  padding: 32px;
  font-size: 18px;

  &.error {
    color: #e74c3c;
  }
}

.cocktail-card {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .details {
    flex: 1;
    min-width: 0;

    h2 {
      margin: 0 0 16px;
      color: #2c3e50;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;

    span {
      padding: 4px 12px;
      background: #f8f9fa;
      border-radius: 4px;
      font-size: 14px;
    }
  }

  .recipe,
  .ingredients {
    margin-top: 24px;

    h3 {
      color: #2c3e50;
      margin-bottom: 8px;
    }
  }

  .ingredients ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 4px;
    }
  }
}

.image {
  width: 300px;
  flex-shrink: 0;

  .image-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  .placeholder {
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;
    animation: shimmer 1.5s linear infinite;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s;

    &.loaded {
      opacity: 1;
    }
  }
}

@keyframes shimmer {
  to {
    background-position: 200% 0;
  }
}

@media (max-width: 768px) {
  .cocktail-view {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;

    .menu-btn {
      display: block;
    }

    nav {
      display: none;
      position: fixed;
      inset: 0 0 auto 0;
      background: white;
      padding-top: 72px;
      z-index: 9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &.is-open {
        display: flex;
      }
    }
  }

  .main {
    padding-top: 72px;
  }

  .cocktail-card {
    flex-direction: column;

    .image {
      width: 100%;
    }
  }
}
</style>
