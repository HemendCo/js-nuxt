
export default (options, app) => ({
  namespaced: true,
  state: () => ({
    options
  }),
  getters: {
    options: state => state.options
  }
})
