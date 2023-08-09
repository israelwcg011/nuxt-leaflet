<template>
  <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
</template>

<script>
export default {
  props: ["url", "attribution"],
};
</script>
