<template>
  <div class="footer_section">
    <p>
      Created By
      <a href="https://github.com/Abdelrhman8Qouay" target="_blank"
        >Abdelrhman Ashraf</a
      >
      With 💖
    </p>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.footer_section {
  display: block;
  width: 100%;
  padding: 20px;
  background-color: var(--elements);
  color: var(--Blue-text);

  p {
    text-align: center;
    margin: 0;
    font-size: 1rem;
    a {
      color: var(--Blue-text);
      text-decoration: none;
      color: chartreuse;
    }
  }
}
</style>