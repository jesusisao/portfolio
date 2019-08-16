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

  public readonly title: string = "Contact";
  public readonly articles = [
    {
      title: "Mail",
      icon: ["fas", "envelope"],
      sentences: ["jesusisao@gmail.com までご連絡ください。"],
      imagePath: "/img/gettingoverit.jpg"
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
    text-shadow:0px 0px 7px #dfe49a;
  }
}
</style>
