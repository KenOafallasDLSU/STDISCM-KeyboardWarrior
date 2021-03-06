const mutations = {
  setUserLoggedIn(state, isLoggedIn) {
    state.user.isLoggedIn = isLoggedIn
  },

  setUserID(state, userID) {
    state.user.id = userID
  },

  setUserName(state, username) {
    state.user.name = username
  },

  setRoomID(state, roomID) {
    state.roomID = roomID
  }
}

export default mutations