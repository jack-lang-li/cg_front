import { createStore } from 'vuex';

const store = createStore({
  state() {
    return { practiceCount: 0 };
  },
  mutations: {
    incrementPracticeCount(state) {
      state.practiceCount += 1;
    },
  },
});

export default store;
