<template>
  <div class="wrapper">
    <h1 class="title">{{ title }}</h1>
    <p>ログインすると、@jesus_isaoの本名や職務経歴にアクセスすることができるようになります。</p>
    <div class="contents container" ref="loginBox">
      <div class="row">
        <label for="email" class="col-sm-4 col-xs-12">メール</label>
        <input type="text" name="email" v-model="email" class="col-sm-6 col-xs-12" />
        <div class="col-sm-2 col-xs-0" />
      </div>
      <div class="row">
        <label for="password" class="col-sm-4 col-xs-12">パスワード</label>
        <input type="password" name="password" v-model="password" class="col-sm-6 col-xs-12" />
        <div class="col-sm-2 col-xs-0" />
      </div>
      <div class="row">
        <div class="col-sm-4 col-xs-12" />
        <button class="col-sm-4 col-xs-12" @click="login">ログイン</button>
        <div class="col-sm-4 col-xs-12" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TweenMax, Expo } from "gsap";
import { mapMutations } from "vuex";
import axios from "axios";
import firebase from "~/mixins/myFirebase";

@Component({
  methods: {
    ...mapMutations({
      storeLogin: "login",
      storeLogout: "logout"
    })
  }
})
export default class extends Vue {
  head() {
    return {
      title: this.title
    };
  }

  public readonly title: string = "Login";
  private email: string = "";
  private password: string = "";
  private storeLogin: any;

  mounted() {
    TweenMax.fromTo(
      this.$refs["loginBox"],
      0.8,
      {
        opacity: 0,
        yPercent: 30
      },
      {
        opacity: 1,
        ease: Expo.easeOut,
        yPercent: 0
      }
    );
  }

  async login() {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password);

      this.storeLogin(result);
      console.log(result);
      this.$router.push("/profile");
    } catch (e) {
      console.warn(e);
    }
  }

  async testPost() {
    try {
      const currentUser = await firebase.auth().currentUser;
      if (currentUser === null) {
        console.info("ログインしていません。");
        return;
      }
      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${idToken}`
        }
      };
      const result = await axios.post("/api/auth/test", { a: "a" }, config);
      console.log(result);
    } catch (e) {
      console.warn(e);
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  .title {
    color: $header-title-color;
    text-shadow: 0px 0px 7px #dfe49a;
  }
  p {
    color: $header-title-color;
  }
}

.contents {
  margin-bottom: 100px;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: $paragraph-color;
  background-color: $background-color;
  box-shadow: 0px 0px 50px -15px #1a1a1a;
  padding: 30px;
  max-width: 500px;
  min-height: 200px;
  .row {
    label {
      text-align: left;
      margin-left: 30px;
    }
    input {
      font-size: 1em;
      color: $paragraph-color;
      border: solid 1px $paragraph-color;
    }
    & + .row {
      margin-top: 10px;
    }
  }
  button {
    // 元の buttonのデザインを打ち消すためのもの
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;

    display: inline-block;
    margin-top: 5px;
    height: 30px;
    color: $paragraph-color;
    background-color: rgb(180, 174, 141);
    border-radius: 5px;
    box-shadow: 0px 0px 20px -7px #1a1a1a;
    opacity: 0.7;
    transition: 0.2s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
