<template>
  <div class="wrapper">
    <h1 class="title">CONTACT</h1>
    <div class="flex-container">
      <article class="contents">
        <h1>連絡先</h1>
        <p>
          jesusisao@gmail.com までご連絡ください。
        </p>
      </article>
    </div>
  </div>
</template>

<script>

export default {
  head () {
    return {
      title: "CONTACT",
    }
  }
};
</script>

<style lang="scss" scoped>
$title-color: #8b8200;

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
