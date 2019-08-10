<template>
  <div class="wrapper">
    <h1 class="title">自己紹介</h1>
    <div class="flex-container">
      <article class="contents">
        <h1>About me</h1>
        <p>
          フロントエンド技術に興味がありますが、どちらかというとバックエンドのつらいコードのリファクタリングをよくやっています。
          リファクタリングも嫌いじゃありません。これまでに最も感銘を受けた技術書もファウラーの『リファクタリング』です。
        </p>
        <p>
          アイコン画像はGetting Over It with Bennett Foddyというゲームの主人公ディオゲネスです。
          このゲームに一時期ハマっており、200回以上クリアしました。
        </p>
        <img src="~/assets/img/gettingoverit.jpg" />
      </article>

      <article class="contents">
        <h1>About page</h1>
        <p>
          このサイトは私 @jesus_isao のポートフォリオとして、
          転職時に人事の査定に関わる方に見てもらうことを想定して作られました。
        </p>
      </article>
    </div>
  </div>
</template>

<script>

export default {
  head () {
    return {
      title: "自己紹介",
    }
  }
};
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
  text-align: center;
  .contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    margin: 10px;
    width: 400px;
    box-sizing: border-box;
    box-shadow: 0px 0px 50px -15px #9b9b9b;
    h1 {
      color: $title-color;
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
