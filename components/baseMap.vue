<template>
  <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
</template>
<script>
export default {
  props: ["url", "attribution"],
  data() {
    return {
      // url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      // attribution: 'teste',
    };
  },
};
</script>
<style></style>
