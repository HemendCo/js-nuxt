
export default options => ({
  namespaced: true,
  state: () => ({
    options
  }),
  getters: {
    options: state => state.options
  }
})
