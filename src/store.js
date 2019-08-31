import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* tab */
    tabnavBox: [
      {
        path: '/layout/index',
        name: '主页'
      }
    ],
    /* 右边 */
    routers: [
      {
        path: '/layout/system',
        name: '菜单管理'
      },
      {
        path: '/layout/role',
        name: '角色管理'
      }
    ],
    /* 右键获取的值 */
    tabNav: {}
  },
  mutations: {
    addTab(state, tab) {
      for (const item of state.tabnavBox) {
        if (item.path === tab.path) {
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
        let url = state.tabnavBox[index] || state.tabnavBox[index - 1]
        tab.router.push(url.path)
      }
    },
    openMenu(state, tab) {
      state.tabNav = tab
    },
    removeOtherTab(state, tab) {
      for (const key in state.tabnavBox) {
        if (key != 0 && state.tabnavBox[key].path != tab.item.path) {
          state.tabnavBox.splice(key, 1)
        }
      }
      let url = state.tabnavBox[1]
      tab.router.push(url.path)
    },
    removeAllTab(state,router) {
      state.tabnavBox = [{
        path: '/layout/index',
        name: '主页'
      }]
      console.log(router)
      let url = state.tabnavBox[0]
      router.push(url.path)
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
    removeAllTab({ commit },router) {
      commit('removeAllTab',router)
    }
  },
  getters: {
    tabNav: state => state.tabNav
  }
})
