export const state = () => ({
  layerActive: ""
})

export const mutations = {
  change(state, payload) {
    state.layerActive = payload.name
  }
}