export default options => {
  const getStorageItem = (name) => {
    const item = localStorage.getItem(name);
    return !!item ? JSON.parse(item) : null;
  }

  const setStorageItem = (name, params) => {
    localStorage.setItem(name, JSON.stringify(params));
  }

  const removeStorageItem = (name) => {
    localStorage.removeItem(name);
  }

  const clearStorage = () => {
    localStorage.clear();
  }

  const state = () => {
    let token = getStorageItem('token');
    let user = getStorageItem('user');
    
    if(token) {
      let current_time = Date.now();
      let expires_time = Date.parse(token.expires_in);
  
      if(current_time > expires_time) {
        token = null;
        user = null;
        removeStorageItem('token');
        removeStorageItem('user');
      }
    }
  
    return {
      token: token,
      user: user,
    }
  };
  
  // getters
  const getters = {
    hasToken: ({ getters }) => getters.has('token'),
    getToken: ({ getters }) => getters.get('token'),
    hasUser: ({ getters }) => getters.has('user'),
    getUser: ({ getters }) => getters.get('user'),
    get: ({ state, getters }) => (param) => {
      return getters.has(param) ? state[param] : null;
    },
    has: state => (param) => {
      return !!state[param];
    },
  }
  
  // mutations
  const mutations = {
    save(state, {token, user}) {
      setStorageItem('token', token);
      setStorageItem('user', user);
      state.token = token;
      state.user = user;
    },
    saveToken(state, token) {
      setStorageItem('token', token);
      state.token = token;
    },
    saveUser(state, user) {
      setStorageItem('user', user);
      state.user = user;
    },
    clear(state, all) {
      try {
        state.token = null;
        state.user = null;
        
        if(all && all === true) {
          clearStorage();
        } else {
          removeStorageItem('token');
          removeStorageItem('user');
        }
      } catch(e) {
        console.log('Error in auth clear storage: ', e.message);
      }
    }
  }
  
  // actions
  const actions = {
    clear(context) {
      context.commit('clear');
    },
    clearAll(context) {
      context.commit('clear', true);
    },
    save(context, payload) {
      context.commit('save', payload)
    },
    saveToken(context, token) {
      context.commit('token', token)
    },
    saveUser(context, user) {
      context.commit('user', user)
    }
  }

  return {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
}