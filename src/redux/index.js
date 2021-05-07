const createStore = (reducer, initialState) => {
  let state = initialState;

  let updater = () => {};

  const getState = (_) => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    updater();
  };

  const subscribe = (listener) => {
    updater = listener;
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

function combineReducers(...reducers) {
  return (state, action) => {
    let finalState = state;

    reducers.forEach((reducer) => {
      finalState = reducer(finalState, action);
    });

    return finalState;
  };
}

export { createStore, combineReducers };
// export default createStore;
