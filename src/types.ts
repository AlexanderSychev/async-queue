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

/** Common event listener */
export interface EventListener {
  (...args: any[]): any;
}

/**
 * Task body - async function which must be executed by task.
 *
 * @template A arguments of function
 * @template R function result
 */
export interface TaskBody<A extends any[] = any[], R = any> {
  (...args: A): R | Promise<R>;
}

/** Result of task execution */
export interface TaskResult<A extends any[] = any[], R = any> {
  /** Task body arguments */
  args: A;
  /** Execution error message */
  error: string | null;
  /** Execution result */
  result: R | null;
}

/** Available task events types */
export const enum TaskEventType {
  /** Task was started */
  START = 'TaskEventType.START',
  /** Task completed successfully */
  SUCCESS = 'TaskEventType.SUCCESS',
  /** Tasks throws an error */
  ERROR = 'TaskEventType.ERROR',
  /** Task execution ended (successfully or with error) */
  END = 'TaskEventType.END',
}
