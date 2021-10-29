export const state = () => ({
  user: {},
  messages: [],
  users: []
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearData(state) {
    state.user = {}
    state.messages = []
    state.users = []
  },
  addMessage(state, message) {
    state.messages.push(message)
  },
  updateUsers(state, users) {
    state.users = users
  }
}

export const actions = {
  socket_newMessage({ commit }, data) {
    commit("addMessage", data)
  },
  socket_updateUsers({ commit }, data) {
    commit("updateUsers", data)
  }
}
