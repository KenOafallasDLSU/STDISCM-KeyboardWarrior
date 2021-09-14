const getters = {
  getCurrentUserID: state => state.user.id,
  getCurrentUserName: state => state.user.name,
  getCurrentRoomID: state => state.roomID
}

export default getters