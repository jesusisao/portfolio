<template>
  <div class="wrapper">
    <h1 class="title">{{ title }}</h1>
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

  public readonly title: string = "About page";
  public readonly articles = [
    {
      title: "About page",
      icon: ["fas", "sitemap"],
      sentences: [
        "このサイトは私 @jesus_isao のポートフォリオとして、転職時に採用に関わる方に見てもらうことを想定して作られました。",
        "Nuxt.js + TypeScriptで作られています。背景はHTML5のCanvasで描いて動かしています。",
        "背景のcanvasは文字を読む時邪魔だった場合に備えてStopできるようにしています。"
      ]
    }
  ];
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .title {
    color: $header-title-color;
    text-shadow: 0px 0px 7px #dfe49a;
  }
}
</style>
