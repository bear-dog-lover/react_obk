import shortid from 'shortid';

export const inputTask = (task) => ({
  type: 'INPUT_TASK',
  payload: {
    task
  }
});

// ActionCreater
// Actionを利用する際はすべてこいつを経由する
export const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: {
    task
  }
});

// 同期アクションクリエーター
export function addTodo(title) {
  return {
    type: 'ADD_TODO',
    payload: {
      id: shortid.generate(),
      title,
    },
  };
}

const sleep1000ms = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

// 非同期アクションクリエーター
export function asyncAddTodo(title) {
  return (dispatch, getState) => {
    sleep1000ms().then(() => {
      dispatch(addTodo(title));
    }, 1000);
  };
}
