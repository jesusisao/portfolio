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
export default class extends Vue {
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
        "4年目エンジニアです。フロントエンド技術に興味がありますが、仕事ではフロントエンド／バックエンド問わずリファクタリングをよくやっています。リファクタリングも嫌いではなく、コードが綺麗になっていく過程が好きです。これまでに最も感銘を受けた技術書もMartin Fowlerの『リファクタリング』です。",
        "アイコン画像はGetting Over It with Bennett Foddyというゲームの主人公ディオゲネスです。このゲームに一時期ハマっており、200回以上クリアしました。"
      ],
      imagePath: "/img/gettingoverit.jpg"
    },
    {
      title: "Details",
      icon: ["fas", "info-circle"],
      list: [
        "テストを意識したコードを書けるエンジニアです。",
        "循環的複雑度を気にするなど、コードの可読性や品質には細心の注意を払っています。",
        "インデックスがいつ使われるのか、といったパフォーマンスを意識したクエリを書き、DB設計ができます。",
        "レイヤが低いプログラミングは未経験です。",
        "競技プログラミングは未経験です。",
        "AI・機械学習等は未経験です。",
        "英語は話せませんが英語のドキュメントを読むことができます。",
        "非同期処理はPromiseでもasync／awaitでも理解して書くことができます。",
        "高階関数を理解し、書くことができます。",
        "クラスベース／プロトタイプベースのオブジェクト指向プログラミングはもちろん、関数パラダイムの言語にもキャッチアップしていく自信があります。"
      ]
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
            language: "SQL",
            experience: "実務3年"
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
            language: "Python",
            experience: "実務1年"
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
            language: "TypeScript",
            experience: "趣味"
          },
          {
            language: "HTML5 / CSS3",
            experience: "実務1年"
          },
          {
            language: "SCSS",
            experience: "実務半年"
          },
          {
            language: "Haskell",
            experience: "趣味"
          }
        ]
      }
    },
    {
      title: "Other skills",
      icon: ["fas", "server"],
      table: {
        fields: [
          {
            key: "name",
            label: "インフラ ／ フレームワーク他",
            sortable: true
          },
          { key: "experience", label: "経験", sortable: true }
        ],
        items: [
          {
            name: "AWS",
            experience: "実務1年"
          },
          {
            name: "Oracle Database",
            experience: "実務2年"
          },
          {
            name: "MySQL(Aurora)",
            experience: "実務1年"
          },
          {
            name: "Bash / Zsh",
            experience: "実務1年"
          },
          {
            name: "Jenkins",
            experience: "実務半年"
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
          {
            name: "Docker",
            experience: "趣味"
          }
        ]
      }
    },
    {
      title: "Hobby",
      icon: ["fas", "gamepad"],
      sentences: [
        "ものを作るのが好きで、一時期はDTMをしたり映像を作ったりしていましたが、最近はゲームをします。Apex LegendsをしながらたまにGetting Over Itで山登りをする日々です。"
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
