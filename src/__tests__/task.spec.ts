/*
 * Copyright (c) 2022 Alexander Sychev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Task } from '../task';
import { TaskEventType } from '../types';
import { successTask, SUCCESS_MESSAGE, failedTask, FAILED_MESSAGE } from './test-helpers';

interface MockListeners {
  onStart: jest.Mock;
  onEnd: jest.Mock;
  onSuccess: jest.Mock;
  onError: jest.Mock;
}

function makeMockListeners(task: Task): MockListeners {
  const onStart = jest.fn();
  const onEnd = jest.fn();
  const onSuccess = jest.fn()
  const onError = jest.fn();

  task.once(TaskEventType.START, onStart);
  task.once(TaskEventType.END, onEnd);
  task.once(TaskEventType.SUCCESS, onSuccess);
  task.once(TaskEventType.ERROR, onError);

  return {
    onStart,
    onEnd,
    onSuccess,
    onError,
  };
}

test('Test succeed task execution', async () => {
  const task = new Task(successTask, 500);
  const {
    onStart,
    onEnd,
    onSuccess,
    onError,
  } = makeMockListeners(task);

  await task.run();

  expect(onStart).toHaveBeenCalled()
  expect(onEnd).toHaveBeenCalledWith(null, SUCCESS_MESSAGE)
  expect(onSuccess).toHaveBeenCalledWith(SUCCESS_MESSAGE)
  expect(onError).not.toHaveBeenCalled()
});

test('Test failed task execution', async () => {
  const task = new Task(failedTask, 500);
  const {
    onStart,
    onEnd,
    onSuccess,
    onError,
  } = makeMockListeners(task);

  await task.run().catch();

  expect(onStart).toHaveBeenCalled()
  expect(onEnd).toHaveBeenCalledWith(new Error(FAILED_MESSAGE), null)
  expect(onSuccess).not.toHaveBeenCalled()
  expect(onError).toHaveBeenCalledWith(new Error(FAILED_MESSAGE));
});
