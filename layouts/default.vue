<template>
  <div>
    <particle class="back-canvas" ref="canvas" />
    <div class="front">
      <div class="side-menu">
        <div class="list">
          <nuxt-link class="link" to="/login">login</nuxt-link>
          <nuxt-link class="link" to="/about">About page</nuxt-link>
          <nuxt-link class="link" to="/">自己紹介</nuxt-link>
          <nuxt-link class="link" to="/my-qiita">投稿したQiitaの記事</nuxt-link>
          <nuxt-link class="link" to="/contact">Contact</nuxt-link>
          <template v-if="isRunning">
            <div class="link" @click="$refs.canvas.stopCanvas()">Stop Canvas</div>
          </template>
          <template v-else>
            <div class="link" @click="$refs.canvas.startCanvas()">Restart Canvas</div>
          </template>
          <div class="link" @click="$refs.canvas.regenerateCanvas()">Regenerate Canvas</div>
        </div>
        <span class="line" />
      </div>
      <nuxt class="main" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {
    Particle: () => import("~/components/particle-canvas.vue")
  },
  computed: {
    ...mapGetters({
      isRunning: "particle/isRunning"
    })
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
$width: 180px;
$title-color: #8b8200;

.back-canvas {
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
}

.front {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 15px;
  }
  /*スクロールバーの背景色・角丸指定*/
  &::-webkit-scrollbar-track {
    border-radius: 0px;
    background: rgba(0, 0, 0, 0);
  }
  /*スクロールバーの色・角丸指定*/
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background: rgba(254, 255, 173, 0.5);
  }
  &::-webkit-scrollbar-corner {
    display: none;
  }
  .main {
    margin-left: $width;
  }
}

.side-menu {
  position: fixed;
  bottom: 50px;
  width: $width;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .list {
    padding: 0;
    margin: 0 0 0 20px;
    text-align: left;
    vertical-align: middle;
    font-size: 0.8em;
    .link {
      display: block;
      color: rgb(163, 163, 163);
      text-decoration: none;
      text-shadow: 0px 0px 7px #242424;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      z-index: 10;
      & + .link {
        margin-top: 10px;
      }
      &:hover {
        color: $title-color;
      }
    }
  }
  .line {
    display: inline-block;
    position: absolute;
    left: 20px;
    background: linear-gradient(
      to bottom,
      rgba(200, 200, 200, 0) 0%,
      rgba(200, 200, 200, 1) 25%,
      rgba(200, 200, 200, 1) 50%,
      rgba(200, 200, 200, 1) 75%,
      rgba(200, 200, 200, 0) 100%
    );
    height: 300px;
    width: 2px;
    z-index: -1;
  }
}
</style>
