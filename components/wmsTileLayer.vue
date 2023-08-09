<template>
  <l-wms-tile-layer
    :base-url="baseUrl"
    :layers="layers"
    :visible="visible"
    :name="name"
    :attribution="attribution"
    :transparent="transparent"
    :format="format"
  >
  </l-wms-tile-layer>
</template>
<script>
export default {
  props: [
    "baseUrl",
    "layers",
    "visible",
    "name",
    "attribution",
    "transparent",
    "format",
  ],
};
</script>
