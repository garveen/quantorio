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
    loadedLanguage (state, v) {
      state.loadedLanguages[v] = true
    }
  }
})

export default store
