<template>
  <v-dialog persistent v-model="show" transition="dialog-top-transition" max-width="600">
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar class="text-h4" :color="color" dark>{{ title }}</v-toolbar>
        <v-card-text>
          <div class="text-h6 pa-8">{{ text }}</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click.stop="show = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  props: ["visible", "color", "title", "text"],
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
};
</script>
