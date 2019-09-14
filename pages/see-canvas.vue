<template>
  <div class="wrapper"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue {
  head() {
    return {
      title: this.title
    };
  }

  public readonly title: string = "canvasを見る";
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
