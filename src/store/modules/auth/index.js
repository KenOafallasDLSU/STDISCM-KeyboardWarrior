import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  user: {
    isLoggedIn: false,
    name: "",
    id: null
    // name: "Kenneth",
    // id: "zsVoTFJsg1UOSBeqLxfa"
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
