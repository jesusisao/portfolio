<template>
  <div class="flex-container">
    <article
      class="contents"
      v-for="(article, index) in articles"
      :key="index"
      :ref="`article${index}`"
    >
      <h1 class="wf-wire-one">
        <font-awesome-icon :icon="article.icon" class="icon" />
        {{ article.title }}
      </h1>
      <p v-for="(sentence, i) in article.sentences" :key="i">{{ sentence }}</p>
      <b-table
        :items="article.table.items"
        :fields="article.table.fields"
        v-if="article.table"
        striped
      />
      <ul v-if="article.list">
        <li v-for="(li, i) in article.list" :key="i">{{ li }}</li>
      </ul>
      <img :src="article.imagePath" v-if="article.imagePath" />
    </article>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import { TweenMax, Expo } from "gsap";

type CardArticle = {
  title: string;
  icon?: [string, string];
  sentences?: string[];
  table?: BTable;
  list?: string[];
  imagePath?: string;
};

type BTable = {
  fields: Array<any>;
  items: Array<any>;
};

@Component
export default class FlexCardArticles extends Vue {
  @Prop() articles!: Array<CardArticle>;

  mounted() {
    this.animate();
  }

  @Watch("articles")
  articlesChanged() {
    this.$nextTick(() => {
      this.animate();
    });
  }

  animate() {
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
.flex-container {
  margin-bottom: 100px;
  display: flex;
  flex-flow: wrap;
  max-width: 1000px;
  justify-content: left;
  text-align: center;
  .contents {
    background-color: $background-color;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    padding: 30px;
    margin: 10px;
    width: 400px;
    box-sizing: border-box;
    box-shadow: 0px 0px 50px -15px #1a1a1a;
    h1 {
      color: $title-color;
      .icon {
        margin-right: 10px;
      }
    }
    p {
      text-align: left;
      text-indent: 1em;
      color: $paragraph-color;
      width: 100%;
    }
    table {
      color: $paragraph-color;
      font-size: 0.8em;
    }
    ul {
      text-align: left;
      color: $paragraph-color;
      font-size: 1em;
      list-style-type: circle;
    }
    img {
      width: 100px;
      height: auto;
      border-radius: 50%;
      border: 10px solid rgb(250, 250, 250);
      box-shadow: 0px 0px 50px -15px #9b9b9b;
      box-sizing: content-box;
    }
  }
}
</style>
