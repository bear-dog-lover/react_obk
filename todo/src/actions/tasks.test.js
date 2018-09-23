import { addTask } from './tasks';

describe('Actions', () => {
  test('addTask Action', () => {
    const task = '買い物';
    const result = addTask(task);
    const expected = {
      type: 'ADD_TASK',
      payload: {
        task,
      },
    };
    
    expect(result).toEqual(expected);
  });
});