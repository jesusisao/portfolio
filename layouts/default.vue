<template>
  <div>
    <div class="side-menu">
      <ul>
        <li>自己紹介</li>
        <li>投稿したQiitaの記事</li>
        <li>CONTACT</li>
        <li>おまけ：テトリス？</li>
        <li>おまけ：Slack絵文字紹介</li>
      </ul>
      <span class="line" />
    </div>
    <nuxt />
  </div>
</template>

<style lang="scss" scoped>
$width: 250px;

.side-menu {
  position: fixed;
  bottom: 50px;
  width: $width;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    text-align: center;
    vertical-align: middle;
    li {
      background-color: rgba(255, 255, 255, 0.7);
      color: rgb(163, 163, 163);
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      z-index: 10;
      & + li {
        margin-top: 10px;
      }
      &:hover {
        color: #001e57;
        font-size: 1.1em;
      }
    }
  }
  .line {
    position: absolute;
    left: $width / 2;
    background-color: rgba(0, 0, 0, 0.075);
    height: 250px;
    width: 2px;
    z-index: -1;
  }
}
</style>
