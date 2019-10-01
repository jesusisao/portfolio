<template>
  <div class="wrapper">
    <h1 class="title">{{ title }}</h1>
    <p>投稿したQiitaの記事のうち、特に見てほしいものをピックアップしています。</p>
    <p>
      Qiitaのマイページは
      <a
        href="https://qiita.com/jesus_isao"
        target="_blank"
        rel="noopener noreferrer"
      >こちら</a>です。
    </p>

    <div class="flex-container">
      <div
        class="contents"
        v-for="(article, index) in articles"
        :key="index"
        :ref="`article${index}`"
      >
        <article>
          <h1>
            <a :href="article.url" target="_blank" rel="noopener noreferrer">{{ article.title }}</a>
          </h1>
          <p v-for="(sentence, i) in article.sentences" :key="i">{{ sentence }}</p>
          <font-awesome-icon :icon="article.icon" class="icon" />
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
export default class extends Vue {
  head() {
    return {
      title: this.title
    };
  }

  public readonly title: string = "投稿したQiitaの記事";

  public readonly articles: Array<QiitaArticle> = [
    {
      title: "君には1時間でGitについて知ってもらう(with VSCode)",
      url: "https://qiita.com/jesus_isao/items/63557eba36819faa4ad9",
      icon: ["fab", "git-alt"],
      sentences: [
        "QiitaのSEO効果もあり、ありがたいことにGitで検索すると4~5番目くらいに出てくれます(2019/09/29 現在)。一番読まれた時でQiitaのトレンドの日間1位、週間1位、月間2位まで行きました。",
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
        "「委譲」は私にとって長い間謎だった概念で、モヤモヤしながらプログラミングしていたので、正体が分かった時はとてもスッキリしました。この記事に辿り着いた人も同様の漠然とした疑問を抱いていると思うので、それを是非解消して欲しいなと思って書きました。"
      ]
    },
    {
      title: "図解！ Gitのブランチ・ツリーをちゃんと読む",
      url: "https://qiita.com/jesus_isao/items/2a0495c973a4c911c2cc",
      icon: ["fab", "git-alt"],
      sentences: [
        "Gitの記事が伸びたしこれも伸びるかな？ と思って書いたら全然伸びなかった記事です。けれどもなるべく分かりやすくなるように書きました。読んでくれた人からはわりと好評です。"
      ]
    },
    {
      title: "自分のポートフォリオを説明するだけ",
      url: "https://qiita.com/jesus_isao/items/556d26e80638f248c35f",
      icon: ["fab", "vuejs"],
      sentences: [
        "このページの技術的な説明について書いてあります。構成がどういう風になっているのか、使用している技術は何なのか、などを知ることができます。"
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
  .title {
    color: $header-title-color;
    text-shadow: 0px 0px 7px #dfe49a;
  }
  p {
    color: $header-title-color;
  }
}

.flex-container {
  margin-bottom: 100px;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  .contents {
    display: flex;
    background-color: $background-color;
    flex-direction: row;
    align-items: center;
    padding: 30px;
    margin: 10px;
    max-width: 700px;
    box-sizing: border-box;
    box-shadow: 0px 0px 50px -15px #1a1a1a;
    article {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 100px;
        color: #838383;
        font-size: 100px;
        margin: 5px;
      }
      h1 {
        color: $title-color;
        text-align: left;
        a {
          color: #55c500; // Qiitaの色
        }
      }
      p {
        color: $paragraph-color;
        text-align: left;
        text-indent: 1em;
      }
    }
  }
}
</style>
