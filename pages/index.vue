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
export default class AppSelfIntroduce extends Vue {
  head() {
    return {
      title: this.data().title
    };
  }

  data() {
    return {
      title: "自己紹介",
      articles: [
        {
          title: "自己紹介",
          icon: ["fas", "user"],
          sentences: [
            "フロントエンド技術に興味がありますが、仕事ではフロントエンド／バックエンド問わずつらいコードのリファクタリングをよくやっています。リファクタリングも嫌いじゃありません。これまでに最も感銘を受けた技術書もファウラーの『リファクタリング』です。",
            "アイコン画像はGetting Over It with Bennett Foddyというゲームの主人公ディオゲネスです。このゲームに一時期ハマっており、200回以上クリアしました。"
          ],
          imagePath: "/img/gettingoverit.jpg"
        },
        {
          title: "スキルセット",
          icon: ["fas", "wrench"]
        },
        {
          title: "趣味",
          icon: ["fas", "gamepad"]
        },
        {
          title: "About page",
          icon: ["fas", "sitemap"],
          sentences: [
            "このサイトは私 @jesus_isao のポートフォリオとして、転職時に人事の査定に関わる方に見てもらうことを想定して作られました。"
          ]
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
  justify-content: center;
  flex-direction: column;
  h1 {
    color: $title-color;
  }
}
</style>
