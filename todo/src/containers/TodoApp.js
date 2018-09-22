import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TodoApp from '../components/TodoApp';
import { inputTask, addTask } from '../actions/tasks';
//import { inputTask, asyncAddTodo, addTodo } from '../actions/tasks';

function mapStateToProps({ tasks }) {
  return {
    task: tasks.task,
    tasks: tasks.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTask(task) {
      dispatch(addTask(task));
    },
/*
    asyncAddTodo(task) {
      dispatch(asyncAddTodo(task));
    },
*/
    inputTask(task) {
      dispatch(inputTask(task));
    },
    redirectToError() {
      dispatch(push('/error'));
    },
  };
}

// Componentに対してReactのContextで保持しているStoreを提供する
export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);