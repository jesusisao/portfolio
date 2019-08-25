<template>
  <div class="wrapper">
    <h1 class="title">{{ title }}</h1>
    <p>※ログイン時のみ見れるコンテンツです。</p>
    <flex-card-articles :articles="articles" :flexBasis="800" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
import { getIdToken } from "~/mixins/myFirebase";

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
  public articles = [];

  async mounted() {
    await this.fetchArticles();
  }

  async fetchArticles() {
    try {
      const idToken = await getIdToken();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${idToken}`
        }
      };
      const result = await axios.post("/api/career", {}, config);
      console.log(result);
      this.articles = result.data.contents.articles;
      return;
    } catch (e) {
      console.warn(e);
    }
  }
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
