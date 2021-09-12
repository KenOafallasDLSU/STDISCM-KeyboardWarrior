const actions = {
  /**
   * Sets the user state 
   * @param user the logged in user or a null object  
   */
  async setUser({ commit }, {userID, username}) {
    commit('setUserLoggedIn', true)
    commit('setUserID', userID)
    console.log(username)
    commit('setUserName', username)
  },

  /**
   * Logs the user out and destroys local user state 
   */
  async logoutUser({ commit }) {
    commit('setUserLoggedIn', false)
    commit('setUserID', null)
    commit('setUserName', null)
  }
}

export default actions
