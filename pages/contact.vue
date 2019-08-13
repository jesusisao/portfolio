<template>
  <div class="wrapper">
    <h1 class="title" ref="title">{{ title }}</h1>
    <div ref="articlesWrapper">
      <flex-card-articles :articles="articles" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    FlexCardArticles: () => import("~/components/flex-card-articles.vue")
  }
})
export default class AppContact extends Vue {
  head() {
    return {
      title: this.data().title
    };
  }

  data() {
    return {
      title: "CONTACT",
      articles: [
        {
          title: "Mail",
          icon: ["fas", "envelope"],
          sentences: ["jesusisao@gmail.com までご連絡ください。"],
          imagePath: "/img/gettingoverit.jpg"
        }
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  h1 {
    color: $title-color;
  }
}
</style>
