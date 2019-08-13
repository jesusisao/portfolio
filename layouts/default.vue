<template>
  <div>
    <div class="side-menu">
      <div class="list">
        <nuxt-link class="link" to="/">自己紹介</nuxt-link>
        <nuxt-link class="link" to="/my-qiita">投稿したQiitaの記事</nuxt-link>
        <nuxt-link class="link" to="/contact">CONTACT</nuxt-link>
        <nuxt-link class="link" to="/particle">パーティクル</nuxt-link>
      </div>
      <span class="line" />
    </div>
    <nuxt class="main" />
  </div>
</template>

<style lang="scss" scoped>
$width: 180px;
$title-color: #8b8200;

.main {
  margin-left: $width;
}

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
    margin: 0 0 0 20px;
    text-align: left;
    vertical-align: middle;
    font-size: 0.8em;
    .link {
      display: block;
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
    height: 220px;
    width: 2px;
    z-index: -1;
  }
}
</style>
