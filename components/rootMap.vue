<template>
  <client-only>
    <l-map :zoom="zoom" :center="center" :options="{zoomControl: false}">
      <!-- <baseMap></baseMap> -->
      <slot></slot>
    </l-map>
  </client-only>
</template>
<script>
export default {
  props: ["zoom", "center"],
  data() {
    return {
    };
  },
};
</script>
