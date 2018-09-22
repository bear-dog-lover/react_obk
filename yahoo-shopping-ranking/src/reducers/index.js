// 何もしないReducer
export const noop = (state = {}) => state;

// 2つのReducerへの参照
export { default as shopping } from './shopping';
export { default as Ranking } from './Ranking';