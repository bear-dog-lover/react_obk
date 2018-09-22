import { createStore, replaceReducer } from 'redux';

const initialState = {
  tasks: []
};

function addReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: state.tasks.concat([action.payload.task])
      };
    default:
      return state;
  }
}

function resetReducer(state = initialState, action) {
  switch(action.type) {
    case 'RESET_TASK':
      return {
        ...state,
        tasks: []
      };
    default:
      return state;
  }
}

const store = createStore(addReducer);

const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: {
    task
  }
});

store.dispatch(addTask('Storeを学ぶ'));

console.log(store.getState());

// 5.11
store.replaceReducer(resetReducer);

console.log(store.getState());

const resetTask = () => ({
  type: 'RESET_TASK'
});

store.dispatch(resetTask());

console.log(store.getState());