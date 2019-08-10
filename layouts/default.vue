<template>
  <div>
    <div class="side-menu">
      <div class="list">
        <nuxt-link class="link" to="/">自己紹介</nuxt-link>
        <nuxt-link class="link" to="/my-qiita">投稿したQiitaの記事</nuxt-link>
        <nuxt-link class="link" to="/contact">CONTACT</nuxt-link>
        <nuxt-link class="link" to="/">おまけ：テトリス？</nuxt-link>
        <nuxt-link class="link" to="/">おまけ：Slack絵文字紹介</nuxt-link>
      </div>
      <span class="line" />
    </div>
    <nuxt />
  </div>
</template>

<style lang="scss" scoped>
$width: 250px;
$title-color: #8b8200;

.side-menu {
  position: fixed;
  bottom: 50px;
  width: $width;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .list {
    padding: 0;
    margin: 0;
    text-align: center;
    vertical-align: middle;
    .link {
      display: block;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      color: rgb(163, 163, 163);
      text-decoration: none;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      z-index: 10;
      & + .link {
        margin-top: 10px;
      }
      &:hover {
        color: $title-color;
        font-size: 1.1em;
      }
    }
  }
  .line {
    position: absolute;
    left: $width / 2;
    background: linear-gradient(
      to bottom,
      rgba(200, 200, 200, 0) 0%,
      rgba(200, 200, 200, 1) 25%,
      rgba(200, 200, 200, 1) 50%,
      rgba(200, 200, 200, 1) 75%,
      rgba(200, 200, 200, 0) 100%
    );
    height: 220px;
    width: 2px;
    z-index: -1;
  }
}
</style>
