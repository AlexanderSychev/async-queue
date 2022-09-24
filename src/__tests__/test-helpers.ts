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

/** Result of {@link successTask} function */
export const SUCCESS_MESSAGE = 'TASK SUCCEED';

/** Message of error throw by {@link failedTask} function */
export const FAILED_MESSAGE = 'TASK FAILED';

/**
 * Promisified `setTimeout` to emulate latency
 *
 * @param ms Time to wait in milliseconds (`number` value)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Task function which ends successfully
 *
 * @param ms Time to wait in milliseconds (`number` value)
 *
 * @returns {@link SUCCESS_MESSAGE} constant value
 */
export async function successTask(ms: number): Promise<string> {
  await sleep(ms);
  return SUCCESS_MESSAGE;
}

/**
 * Task function which fails with error
 *
 * @param ms Time to wait in milliseconds (`number` value)
 *
 * @throws Standard `Error` with {@link FAILED_MESSAGE} constant as message
 */
export async function failedTask(ms: number): Promise<void> {
  await sleep(ms);
  throw new Error(FAILED_MESSAGE);
}
