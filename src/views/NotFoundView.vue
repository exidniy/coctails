<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The cocktail you're looking for doesn't exist.</p>
    <router-link to="/" class="back-link">Go to Home</router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  padding: 2rem;

  h1 {
    color: #e74c3c;
    margin-bottom: 1rem;
  }

  .back-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
      background-color: #2980b9;
    }
  }
}
</style>
