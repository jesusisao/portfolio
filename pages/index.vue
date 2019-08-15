<template>
  <div class="wrapper">
    <h1 class="title">{{ title }}</h1>
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
export default class AppSelfIntroduce extends Vue {
  head() {
    return {
      title: this.title
    };
  }

  public readonly title: string = "自己紹介";
  public readonly articles = [
    {
      title: "Overview",
      icon: ["fas", "user"],
      sentences: [
        "フロントエンド技術に興味がありますが、仕事ではフロントエンド／バックエンド問わずつらいコードのリファクタリングをよくやっています。リファクタリングも嫌いじゃありません。これまでに最も感銘を受けた技術書もファウラーの『リファクタリング』です。",
        "アイコン画像はGetting Over It with Bennett Foddyというゲームの主人公ディオゲネスです。このゲームに一時期ハマっており、200回以上クリアしました。"
      ],
      imagePath: "/img/gettingoverit.jpg"
    },
    {
      title: "Programming skills",
      icon: ["fas", "wrench"],
      table: {
        fields: [
          { key: "language", label: "言語", sortable: true },
          { key: "experience", label: "経験", sortable: true }
        ],
        items: [
          {
            language: "JavaScript (ES6+)",
            experience: "実務半年"
          },
          {
            language: "JavaScript (ES5)",
            experience: "趣味"
          },
          {
            language: "VB 2010",
            experience: "実務2年"
          },
          {
            language: "PL/SQL",
            experience: "実務2年"
          },
          {
            language: "C#",
            experience: "実務半年"
          },
          {
            language: "Java",
            experience: "実務半年"
          },
          {
            language: "Python",
            experience: "実務1年"
          },
          {
            language: "TypeScript",
            experience: "趣味"
          },
          {
            language: "HTML5 / CSS3",
            experience: "実務半年"
          },
          {
            language: "SCSS",
            experience: "実務半年"
          }
        ]
      }
    },
    {
      title: "Other skills",
      icon: ["fas", "wrench"],
      table: {
        fields: [
          { key: "name", label: "インフラ ／ フレームワーク他", sortable: true },
          { key: "experience", label: "経験", sortable: true }
        ],
        items: [
          {
            name: "AWS",
            experience: "実務1年"
          },
          {
            name: "Jenkins",
            experience: "実務半年"
          },
          {
            name: "Docker",
            experience: "趣味"
          },
          {
            name: "Circle CI",
            experience: "実務半年"
          },
          {
            name: "Git",
            experience: "実務1年"
          },
          {
            name: "Subversion",
            experience: "実務半年"
          },
          {
            name: "Node.js",
            experience: "趣味"
          },
          {
            name: "Flask",
            experience: "実務半年"
          },
          {
            name: "Nuxt.js",
            experience: "実務半年"
          },
          {
            name: "Angular",
            experience: "趣味"
          },
        ]
      }
    },
    {
      title: "Hobby",
      icon: ["fas", "gamepad"],
      sentences: [
        "一時期はDTMをしたり映像を作ったりしていましたが、最近はゲームをします。Apex LegendsをしながらたまにGetting Over Itで山登りをする日々です。"
      ]
    },
    {
      title: "About page",
      icon: ["fas", "sitemap"],
      sentences: [
        "このサイトは私 @jesus_isao のポートフォリオとして、転職時に人事の査定に関わる方に見てもらうことを想定して作られました。",
        "Nuxt + TypeScriptで作られています。背景はHTML5のCanvasで描いて動かしています。"
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
    text-shadow: 0px 0px 7px #242424;
  }
}
</style>
