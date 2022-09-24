import { AsyncTaskQueue } from '../async-task-queue';
import { successTask, SUCCESS_MESSAGE, failedTask, FAILED_MESSAGE } from './test-helpers';

test('If queue is empty then task will be executed immediately', async () => {
  const queue = new AsyncTaskQueue();
  const result = await queue.push(successTask, 300);
  expect(result).toEqual({
    args: [300],
    error: null,
    result: SUCCESS_MESSAGE,
  });
});

test('If queue is not empty then task will be executed after the previous task', async () => {
  const queue = new AsyncTaskQueue();
  queue.push(successTask, 700);
  const result = await queue.push(successTask, 300);
  expect(result).toEqual({
    args: [300],
    error: null,
    result: SUCCESS_MESSAGE,
  });
});

test('If a task in the queue fails the rest of the tasks will still be executed', async () => {
  const queue = new AsyncTaskQueue();
  queue.push(failedTask, 700);
  const result = await queue.push(successTask, 300);
  expect(result).toEqual({
    args: [300],
    error: null,
    result: SUCCESS_MESSAGE,
  });
});

test('If task failed with error then method returns not null "error" property in result', async () => {
  const queue = new AsyncTaskQueue();
  const result = await queue.push(failedTask, 300);
  expect(result).toEqual({
    args: [300],
    error: new Error(FAILED_MESSAGE),
    result: null,
  });
});
