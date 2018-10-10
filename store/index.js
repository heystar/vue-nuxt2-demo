export const state = () => {
  list: []
}

export const getter = () => {
  getList: state => state.list
}

export const mutations = {
  SET_LIST (state, data) {
    state.list = data
  }
}

export const actions = {
  async getList ({ commit }) {
    return this.$axios.get('/api/v1/users').then(res => {
      return commit('SET_LIST', res.data)
    })
  }
}
