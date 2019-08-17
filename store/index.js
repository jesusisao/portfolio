// ※このstoreのプロパティはcookie-storage.js内で永続化を行っており、
//  永続化したいプロパティを追加したときはそこにも追記する必要がある。
export const state = () => ({
  displayName: "",
  email: ""
});

export const mutations = {
  login(state, result) {
    state.displayName = result.user.displayName;
    state.email = result.user.email;
  },
  logout(state) {
    state.displayName = "";
    state.email = "";
  }
};

export const getters = {
  isLoggingIn(state) {
    return state.email !== "";
  }
};
