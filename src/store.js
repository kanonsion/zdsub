import Vue from 'vue'
import Vuex from 'vuex'
import router from './routers'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* tab */
    tabnavBox: [],
    /* 右边 */
    routers: [],
    /* 右键获取的值 */
    tabNav: {}
  },
  mutations: {
    addTab(state, tab) {
      if(tab.path === "/layout") return
      for (const item of state.tabnavBox) {
        if (item.path === tab.path || (tab.path === null && tab.name === null)) {
          return false
        }
      }
      state.tabnavBox.push(tab)
    },
    removeTab(state, tab) {
      let index = state.tabnavBox.findIndex((item) => {
        return item.path === tab.item.path
      })
      state.tabnavBox.splice(index, 1)
      if (tab.item.path === tab.fullPath) {
        let url = state.tabnavBox[index] || state.tabnavBox[index - 1] || ''
        if (url === '') {
          router.push('/layout')
        } else {
          tab.routers.push(url.path)
        }
      }
    },
    openMenu(state, tab) {
      state.tabNav = tab
    },
    removeOtherTab(state, tab) {
      for (const key in state.tabnavBox) {
        console.log(1)
        if (state.tabnavBox[key].path != tab.item.path) {
          state.tabnavBox.splice(key, 1)
        }
      }
    },
    removeAllTab(state, router) {
      state.tabnavBox = []
      router.push('/layout')
    },
    addRouters(state, routers) {
      state.routers = routers
    }
  },
  actions: {
    //添加tab
    addTab({ commit }, tab) {
      commit('addTab', tab)
    },
    //删除单个tab
    removeTab({ commit }, tab) {
      commit('removeTab', tab)
    },
    /* 右击tab,将值传入state */
    openMenu({ commit }, tab) {
      commit('openMenu', tab)
    },
    //删除其他
    removeOtherTab({ commit }, tab) {
      commit('removeOtherTab', tab)
    },
    //删除所有
    removeAllTab({ commit }, router) {
      commit('removeAllTab', router)
    },
    //添加routers
    addRouters({ commit }, routers) {
      commit('addRouters', routers)
    }
  },
  getters: {
    tabNav: state => state.tabNav
  }
})
