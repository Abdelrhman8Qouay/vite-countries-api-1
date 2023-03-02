<script setup>
import { ref, defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";
// Import The Components
import footer from "./components/Footer.vue";
const FooterComp = defineComponent(footer);

const colorMode = ref(false);

function changeMode() {
  document.body.classList.toggle("dark-mode");
  colorMode.value = !colorMode.value;
}
</script>

<template>
  <header>
    <RouterLink to="/">
      <h3>where in the world?</h3>
    </RouterLink>
    <div class="btnMode" @click="changeMode()">
      <font-awesome-icon
        id="icon"
        :icon="colorMode ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"
      />
      <p>{{ colorMode ? "Dark Mode" : "Light Mode" }}</p>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <FooterComp />
</template>

<style lang="scss" scoped>
header {
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: var(--elements);
  a {
    text-decoration: none;
    color: var(--Blue-text);
    margin-left: 20px;
    h3 {
      font-weight: 600;
    }
  }
  .btnMode {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: var(--Blue-text);
    margin-right: 20px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
  }
}

#app main {
  background-color: var(---Gray-background);
  overflow: auto;
}
</style>
