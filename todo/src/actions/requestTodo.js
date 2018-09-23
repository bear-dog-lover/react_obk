import 'isomorphic-fetch';

const fetchTodosRequest = () => ({
  type: 'FETCH_TODOS_REQUEST',
});

const fetchTodosSuccess = (tasks) => ({
  type: 'FETCH_TODOS_SUCCESS',
  tasks
});

const fetchTodos = () => {
  return dispatch => {
    dispatch(fetchTodosRequest());
    // json()は1度しか呼べない
    return fetch('http://whuiojpkgyftcgvhjbknlmexample.com/todos')
      .then(res => {
        const ret = res.json();
        //console.log(ret);
        return ret;
      })
      .then(tasks => {
        //console.log(tasks);
        return dispatch(fetchTodosSuccess(tasks));
      });
  };
};

export default {
  fetchTodos,
};