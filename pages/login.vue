<template>
  <div class="wrapper">
    <h1 class="title">{{ title }}</h1>
  </div>
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

  public readonly title: string = "Login";
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  .title {
    color: $header-title-color;
    text-shadow: 0px 0px 7px #dfe49a;
  }
}
</style>
