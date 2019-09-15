<template>
  <div>
    <particle class="back-canvas" ref="canvas" />
    <div class="front">
      <!-- スマホ対応用のハンバーガーメニュー -->
      <nav
        class="navbar header"
        role="navigation"
        aria-label="main navigation"
        v-if="isSmartPhoneMode"
      >
        <slide left width="300">
          <template v-if="isLoggingIn">
            <p class="slide-link">ログイン中</p>
            <p class="slide-link" v-if="displayName">{{ displayName }}</p>
            <p class="slide-link">{{ email }}</p>
            <p class="slide-link" @click="logout">Logout</p>
          </template>
          <template v-else>
            <nuxt-link class="slide-link" to="/login">Login</nuxt-link>
          </template>

          <hr class="slide-splitter" />

          <nuxt-link class="slide-link" to="/about">About page</nuxt-link>
          <nuxt-link class="slide-link" to="/profile" v-if="isLoggingIn">
            Profile
            <font-awesome-icon :icon="['fas', 'key']" class="icon" />
          </nuxt-link>
          <nuxt-link class="slide-link" to="/career" v-if="isLoggingIn">
            Career
            <font-awesome-icon :icon="['fas', 'key']" class="icon" />
          </nuxt-link>
          <nuxt-link class="slide-link" to="/">自己紹介</nuxt-link>
          <nuxt-link class="slide-link" to="/my-qiita">投稿したQiitaの記事</nuxt-link>
          <nuxt-link class="slide-link" to="/contact">Contact</nuxt-link>
          <br />
          <br />
          <nuxt-link class="slide-link" to="/see-canvas">See canvas</nuxt-link>
          <template v-if="isRunning && !shouldBeStopped">
            <div class="slide-link" @click="$refs.canvas.stopCanvas()">
              <font-awesome-icon :icon="['fas', 'stop-circle']" class="icon" />Stop
            </div>
          </template>
          <template v-else>
            <div class="slide-link" @click="$refs.canvas.startCanvas()">
              <font-awesome-icon :icon="['fas', 'play-circle']" class="icon" />Start
            </div>
          </template>
          <div class="slide-link" @click="$refs.canvas.regenerateCanvas()">
            <font-awesome-icon :icon="['fas', 'redo']" class="icon" />Regenerate
          </div>
        </slide>
      </nav>

      <!-- PC用の通常メニュー -->
      <template v-if="!isSmartPhoneMode">
        <div class="login-info" v-if="isLoggingIn">
          <p class="login-info-li">ログイン中</p>
          <p class="login-info-li" v-if="displayName">{{ displayName }}</p>
          <p class="login-info-li">{{ email }}</p>
          <p class="login-info-li button" @click="logout">Logout</p>
        </div>
        <div class="login-info" v-else>
          <nuxt-link class="login-info-li button" to="/login">Login</nuxt-link>
        </div>
        <div class="side-menu">
          <div class="list">
            <nuxt-link class="link" to="/about">About page</nuxt-link>
            <nuxt-link class="link" to="/profile" v-if="isLoggingIn">
              Profile
              <font-awesome-icon :icon="['fas', 'key']" class="icon" />
            </nuxt-link>
            <nuxt-link class="link" to="/career" v-if="isLoggingIn">
              Career
              <font-awesome-icon :icon="['fas', 'key']" class="icon" />
            </nuxt-link>
            <nuxt-link class="link" to="/">自己紹介</nuxt-link>
            <nuxt-link class="link" to="/my-qiita">投稿したQiitaの記事</nuxt-link>
            <nuxt-link class="link" to="/contact">Contact</nuxt-link>
            <br />
            <br />
            <nuxt-link class="link" to="/see-canvas">See canvas</nuxt-link>
            <template v-if="isRunning && !shouldBeStopped">
              <div class="link" @click="$refs.canvas.stopCanvas()">
                <font-awesome-icon :icon="['fas', 'stop-circle']" class="icon" />Stop
              </div>
            </template>
            <template v-else>
              <div class="link" @click="$refs.canvas.startCanvas()">
                <font-awesome-icon :icon="['fas', 'play-circle']" class="icon" />Start
              </div>
            </template>
            <div class="link" @click="$refs.canvas.regenerateCanvas()">
              <font-awesome-icon :icon="['fas', 'redo']" class="icon" />Regenerate
            </div>
          </div>
          <span class="line" />
        </div>
      </template>
      <nuxt :class="{main: !isSmartPhoneMode }" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters, mapState, mapMutations } from "vuex";
import firebase from "~/mixins/myFirebase";

@Component({
  components: {
    Particle: () => import("~/components/webgl-canvas.vue")
  },
  computed: {
    ...mapGetters({
      isRunning: "particle/isRunning",
      shouldBeStopped: "particle/shouldBeStopped",
      isLoggingIn: "isLoggingIn"
    }),
    ...mapState(["displayName", "email"])
  },
  methods: {
    ...mapMutations({
      storeLogout: "logout"
    })
  }
})
export default class extends Vue {
  private storeLogout: any;
  public isSmartPhoneMode: boolean = false;

  async logout() {
    try {
      await firebase.auth().signOut();
      this.storeLogout();
      console.info("ログアウトしました。");
    } catch (e) {
      console.warn(e);
    }
  }

  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    // スマホでスクロールが行きすぎないようにする対応
    document.addEventListener('touchmove', function(e) {
      if (window.innerHeight >= document.body.scrollHeight) {
        e.preventDefault();
      }
    }, false);
  }

  handleResize() {
    if (window.innerWidth <= 650) {
      this.isSmartPhoneMode = true;
    } else {
      this.isSmartPhoneMode = false;
    }
  }
}
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

.login-info {
  position: fixed;
  display: block;
  top: 10px;
  margin: 0 0 0 20px;
  .login-info-li {
    font-size: 0.8em;
    color: rgb(163, 163, 163);
    margin: 0;
    & + .login-info-li {
      margin-top: 10px;
    }
  }
}

.button {
  display: block;
  width: 80px;
  color: rgb(163, 163, 163);
  text-align: center;
  border-radius: 5px;
  background-color: rgb(85, 87, 61);
  text-shadow: 0px 0px 7px #242424;
  text-decoration: none;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  opacity: 0.7;
  & + .link {
    margin-top: 10px;
  }
  &:hover {
    opacity: 1;
    background-color: rgb(85, 87, 61);
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
    margin: 0 0 0 40px;
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

.slide-link {
  margin: 0;
  color: rgb(163, 163, 163);
  text-decoration: none;
}

.slide-splitter {
  border-top: #a3a3a3 solid 3px;
  margin-right: 40px;
}
</style>
