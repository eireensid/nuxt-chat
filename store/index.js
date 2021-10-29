export const state = () => ({
  user: {},
  messages: []
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearData(state) {
    state.user = {}
    state.messages = []
  },
  addMessage(state, message) {
    state.messages.push(message)
  }
}

export const actions = {
  socket_newMessage({ commit }, data) {
    commit("addMessage", data)
  }
}
