// Taskの初期状態
const initialState = {
  task: '',
  tasks: []
};

// state:  現在の状態を示すstateオブジェクト
// action: どんな操作をしたのかを示すActionオブジェクト
export default function tasksReducer(state = initialState, action) {
  switch(action.type) {
    case 'INPUT_TASK':
      return {
        ...state,
        task: action.payload.task
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: state.tasks.concat([action.payload.task])
      };
    case 'ADD_TODO':
      return {
        ...state,
        tasks: state.tasks.concat([action.payload.title])
      };
    default:
      return state;
  }
}