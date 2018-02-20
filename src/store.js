import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    difficulty: 'normal',
    meta: {},
    metaVersion: 0,
    loading: true,
  },
  mutations: {
    setDifficulty (state, v) {
      state.difficulty = v
    },
    setMeta (state, v) {
      state.meta = v
      state.metaVersion = state.metaVersion + 1
    },
    saveTranslation (state, [name, v]) {
      state.meta.translations[name] = v
    },
    setLoading (state, v) {
      state.loading = v
    }
  }
})

export default store
