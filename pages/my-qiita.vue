<template>
  <div class="wrapper">
    <h1 class="title">投稿したQiitaの記事</h1>
    <p>投稿したQiitaの記事のうち、特に見てほしいものをピックアップしています。</p>
    <p>
      Qiitaのマイページは
      <a
        href="https://qiita.com/jesus_isao"
        target="_blank"
        rel="noopener noreferrer"
      >こちら</a>です。
    </p>

    <div class="flex-container" ref="articlesWrapper">
      <div
        class="contents"
        v-for="(article, index) in articles"
        :key="index"
        :ref="`article${index}`"
      >
        <font-awesome-icon :icon="article.icon" class="icon" />
        <article>
          <h1>
            <a :href="article.url" target="_blank" rel="noopener noreferrer">{{ article.title }}</a>
          </h1>
          <p v-for="(sentence, i) in article.sentences" :key="i">{{ sentence }}</p>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TweenMax, Expo } from "gsap";

type QiitaArticle = {
  title: string;
  url: string;
  icon?: [string, string];
  sentences?: string[];
};

@Component
export default class MyQiita extends Vue {
  head() {
    return {
      title: "投稿したQiitaの記事"
    };
  }

  public readonly articles: Array<QiitaArticle> = [
    {
      title: "君には1時間でGitについて知ってもらう(with VSCode)",
      url: "https://qiita.com/jesus_isao/items/63557eba36819faa4ad9",
      icon: ["fab", "git-alt"],
      sentences: [
        "QiitaのSEO効果もあり、ありがたいことにGitで検索すると5番目くらいに出てくれます(2019/08/10 現在)。一番読まれた時でQiitaのトレンドの月間2位まで行きました。",
        "私自身はGitを1人でよく分からないまま使い始め、長い時間をかけて少しずつ学びましたが、後進の人たちにはそんなしなくてもいい苦労をして欲しくありませんでした。なので退職時の引き継ぎ資料も兼ねてこの記事を書きました。"
      ]
    },
    {
      title:
        "プログラマーを惑わせる３種類の委譲(委譲・Delegation／転送・Forwarding／.NET Delegates)",
      url: "https://qiita.com/jesus_isao/items/4b6b7846ccf5eb46b1bc",
      icon: ["fas", "code"],
      sentences: [
        "一番最初に書いた記事です。そして同時に、今まで書いた記事の中で最も苦労して調査をして勉強しながら書いた記事なので、思い入れがあります。",
        "「委譲」は私にとって長い間謎だった概念で、モヤモヤしながらプログラミングしていたので、正体が分かった時はとてもスッキリしました。記事を読む人にもそのモヤモヤをスッキリして欲しいなと思って書きました。"
      ]
    }
  ];

  mounted() {
    for (let i = 0; i < this.articles.length; i++) {
      TweenMax.fromTo(
        this.$refs["article" + i],
        0.8,
        {
          opacity: 0,
          yPercent: 30
        },
        {
          opacity: 1,
          ease: Expo.easeOut,
          delay: 0.2 * i,
          yPercent: 0
        }
      );
    }
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

.flex-container {
  margin: 0 auto;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  .contents {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 30px;
    margin: 10px;
    max-width: 700px;
    box-sizing: border-box;
    box-shadow: 0px 0px 50px -15px #9b9b9b;
    .icon {
      width: 100px;
      color: #dadada;
      font-size: 100px;
      margin: 0 20px 20px 0;
    }
    article {
      h1 {
        color: $title-color;
        text-align: left;
        a {
          color: #55c500; // Qiitaの色
        }
      }
      p {
        text-align: left;
        text-indent: 1em;
      }
    }
  }
}
</style>
