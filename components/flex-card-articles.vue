<template>
  <div class="flex-container">
    <article class="contents" v-for="(article, index) in articles" :key="index">
      <h1>
        <font-awesome-icon :icon="article.icon" class="icon" />
        {{ article.title }}
      </h1>
      <p v-for="(sentence, i) in article.sentences" :key="i">{{ sentence }}</p>
      <img :src="article.imagePath" v-if="article.imagePath" />
    </article>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

type CardArticle = {
  title: string;
  icon?: [string, string];
  sentences?: string[];
  imagePath?: string;
};

@Component({
  
})

export default class FlexCardArticles extends Vue {
  @Prop() articles!: Array<CardArticle>;
}
</script>

<style lang="scss" scoped>
.flex-container {
  margin: 0 auto;
  display: flex;
  flex-flow: wrap;
  max-width: 1000px;
  justify-content: left;
  text-align: center;
  .contents {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    padding: 30px;
    margin: 10px;
    width: 400px;
    box-sizing: border-box;
    box-shadow: 0px 0px 50px -15px #9b9b9b;
    h1 {
      color: $title-color;
      .icon {
        margin-right: 10px;
      }
    }
    p {
      text-align: left;
      text-indent: 1em;
    }
    img {
      width: 100px;
      border-radius: 50%;
    }
  }
}
</style>
