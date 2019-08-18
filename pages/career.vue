<template>
  <div class="wrapper">
    <h1 class="title">{{ title }}</h1>
    <p>※ログイン時のみ見れるコンテンツです。</p>
    <flex-card-articles :articles="articles" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    FlexCardArticles: () => import("~/components/flex-card-articles.vue")
  }
})
export default class extends Vue {
  head() {
    return {
      title: this.title
    };
  }

  public readonly title: string = "Career";
  public readonly articles = [
    {
      title: "Career",
      icon: ["fas", "briefcase"],
      sentences: [""]
    }
  ];
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
  p {
    color: $header-title-color;
  }
}
</style>
