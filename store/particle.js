export const state = () => ({
  runningIds: [], // 動いているプロセスのId
  stopIds: [], // 止めたいプロセスのId
  isRunning: true
});

export const mutations = {
  addRunningIds(state, id) {
    state.runningIds.push(id);
    state.isRunning = true;
  },
  moveRunningIdsToStopIds(state) {
    state.stopIds = state.stopIds.concat(state.runningIds);
    state.runningIds = [];
    state.isRunning = false;
  }
};

export const getters = {
  isRunning(state) {
    return state.runningIds.length > 0;
  },
  shouldProcessBeStopped(state) {
    return id => state.stopIds.indexOf(id) >= 0;
  }
};
