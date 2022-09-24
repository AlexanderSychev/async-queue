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

import del from 'del';
import gulp from 'gulp';
import mkdirp from 'mkdirp';
import rollupPluginTypeScript from '@rollup/plugin-typescript';
import { rollup } from 'rollup';
import { fileURLToPath } from 'url';
import { join } from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

// Paths

/** Project root directory */
const PROJECT_ROOT_DIR = fileURLToPath(new URL('.', import.meta.url));

/** Typescript configuration file */
const TS_CONFIG = join(PROJECT_ROOT_DIR, 'tsconfig.json');

/** Source code directory */
const SRC_DIR = join(PROJECT_ROOT_DIR, 'src');

/** Bundled code directory */
const LIB_DIR = join(PROJECT_ROOT_DIR, 'lib');

// Utils

/**
 * Cleans directory: delete and recreate it
 *
 * @param dir {string} Directory to clean
 * @returns {Promise<void>}
 */
async function cleanDir(dir) {
  await del(dir);
  await mkdirp(dir);
}

// Cleaning tasks

/** Clean {@link LIB_DIR} directory */
export function clean() {
  return cleanDir(LIB_DIR);
}

// Build tasks

function createRollupBundle() {
  return rollup({
    input: join(SRC_DIR, 'index.ts'),
    plugins: [
      nodeResolve({
        exportConditions: ['node'],
      }),
      rollupPluginTypeScript(),
      // terser(),
    ],
  });
}

/** Make CommonJS module bundle */
export async function bundleCommonJS() {
  const bundle = await createRollupBundle();
  await bundle.write({
    sourcemap: 'inline',
    file: join(LIB_DIR, 'async-task-queue.js'),
    format: 'commonjs',
  });
  await bundle.close();
}

/** Make ECMAScript module bundle */
export async function bundleECMAScriptModule() {
  const bundle = await createRollupBundle();
  await bundle.write({
    sourcemap: 'inline',
    file: join(LIB_DIR, 'async-task-queue.mjs'),
    format: 'esm',
  });
  await bundle.close();
}

/** Make browser IIFE bundle (for CDN) */
export async function bundleIIFEForBrowser() {
  const bundle = await createRollupBundle();
  await bundle.write({
    sourcemap: 'inline',
    file: join(LIB_DIR, 'async-task-queue.browser.js'),
    format: 'iife',
    name: 'asyncQueue',
  });
  await bundle.close();
}

/** Common bundling task */
export const build = gulp.parallel(bundleCommonJS, bundleECMAScriptModule, bundleIIFEForBrowser);

/** Full building task */
export default gulp.series(clean, build);
