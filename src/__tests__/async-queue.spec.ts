import { AsyncQueue } from '../async-queue';

/** Simple sleep promise for async tests */
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

test('"AsyncQueue.push" tests', async () => {
  const queue = new AsyncQueue();

  const task01 = jest.fn(async () => sleep(500));
  const task02 = jest.fn(async () => sleep(100));
  const task03 = jest.fn(async () => sleep(600));

  queue.push(task01);
  queue.push(task02);
  await queue.push(task03);

  expect(task01).toHaveBeenCalled();
  expect(task02).toHaveBeenCalled();
  expect(task03).toHaveBeenCalled();
});
