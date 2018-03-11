import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    difficulty: 'normal',
    meta: {},
    metaVersion: 0,
    loading: 0,
    loadedLanguages: {},
    networkProgress: 0,
    dataProgress: 0,
    indexMounted: false,
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
      if (v) {
        state.loading = state.loading + 1
      } else {
        state.loading = state.loading - 1
      }
    },
    setNetworkProgress (state, v) {
      state.networkProgress = v
    },
    setDataProgress (state, v) {
      state.dataProgress = v
    },
    loadedLanguage (state, v) {
      state.loadedLanguages[v] = true
    },
  }
})

export default store
