export const state = () => ({
  runningIds: [], // 動いているプロセスのId
  terminateIds: [], // 止めたいプロセスのId
  shouldBeStopped: false
});

export const mutations = {
  addRunningIds(state, id) {
    state.runningIds.push(id);
  },
  moveRunningIdsToterminateIds(state) {
    state.terminateIds = state.terminateIds.concat(state.runningIds);
    state.runningIds = [];
  },
  start(state) {
    state.shouldBeStopped = false
  },
  stop(state) {
    state.shouldBeStopped = true
  },
};

export const getters = {
  isRunning(state) {
    return state.runningIds.length > 0;
  },
  shouldBeStopped(state) {
    return state.shouldBeStopped;
  },
  shouldProcessBeTerminated(state) {
    return id => state.terminateIds.indexOf(id) >= 0;
  }
};
