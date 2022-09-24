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

import type { TaskBody } from './types';
import { TaskEventType } from './types';
import { EventEmitter } from './event-emitter';

/** Asynchronous task */
export class Task<A extends any[] = any[], R = any> extends EventEmitter {
  /** Executable body of task */
  private readonly body: TaskBody<A, R>;

  /** Task body arguments */
  private readonly args: A;

  /** @constructor */
  public constructor(body: TaskBody<A, R>, ...args: A) {
    super();
    this.body = body;
    this.args = args;
  }

  /** Run task */
  public run = async (): Promise<void> => {
    let result: R | null = null;
    let error: any = null;
    this.emit(TaskEventType.START);
    try {
      result = await this.body(...this.args);
      this.emit(TaskEventType.SUCCESS, result);
    } catch (err) {
      error = err
      this.emit(TaskEventType.ERROR, error);
    }
    this.emit(TaskEventType.END, error, result);
  }
}
