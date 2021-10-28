export const state = () => ({})

export const actions = {
  socket_newMessage(ctx, data) {
    console.log('Message received', data)
  }
}
