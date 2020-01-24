<template>
  <button class="button"><slot></slot></button>
</template>

<script>
export default {
  name: 'playground-button',
};
</script>

<style scoped>
.button {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 15px;
  padding: 3px 10px;
  margin: 10px;
}
</style>
