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

import { Task } from './task';
import type { TaskBody, TaskResult } from './types';
import { TaskEventType } from './types';

/** Queue structure */
export class AsyncQueue {
  /** Tasks queue array */
  private queue: Task[] = [];

  /** Add element to queue */
  public push = <A extends any[] = any[], R = any>(body: TaskBody<A, R>, ...args: A): Promise<TaskResult<A, R>> => {
    const task: Task<A, R> = new Task<A, R>(body, ...args);

    const promise = new Promise<TaskResult<A, R>>(resolve =>
      task.once(TaskEventType.END, (error: string, result: R) => {
        this.queue.shift();
        resolve({ error, result, args });
      }),
    );

    this.queue.push(<any>task);

    if (this.queue.length > 1) {
      const TASK_INDEX: number = this.queue.length - 1;
      const PREV_TASK_INDEX = TASK_INDEX - 1;
      const prevTask = this.queue[PREV_TASK_INDEX];
      prevTask.once(TaskEventType.END, task.run);
    } else {
      task.run();
    }

    return promise;
  }
}
