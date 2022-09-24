# Async Task Queue

Simple async tasks queue implementation for JavaScript

## Installation

### For Node.JS or bundlers

```shell
npm i node-async-task-queue --save
```

Package available as CommonJS and as EcmaScript module:

```javascript
// Import as CommonJS Module
const { AsyncQueye } = require('node-async-task-queue');

// Import as ECMAScript Module
import { AsyncQueye } from 'node-async-task-queue';
```

### For browser

Just include script to your HTML page:

```html
<script src="https://unpkg.com/node-async-task-queue@1.0.0/umd/async-task-queue.min.js"
```

Library will be available as `asyncTaskQueue` global variable:

```javascript
const queue = new asyncTaskQueue.AsyncQueue();
```

## Usage

First of all, you need to create queue instance:

```javascript
import { AsyncQueye } from 'node-async-task-queue';

const queue = new AsyncQueye();
```

Then you just need to add task functions and, optionally, arguments for them.

```javascript
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function someAction(someParam) {
    await sleep(500);
    return someParam;
}

async function someOtherAction(someParam) {
  await sleep(200);
  return someParam;
}

queue.push(someAction, 'foo');
queue.push(someOtherAction, 'bar').then(result => {
    console.log(result); // Will print object: { args: ['bar'], error: null, result: 'bar' }
})
```

All actions will be executed in series, next after the previous.

If a task in the queue fails the rest of the tasks will still be executed:

```javascript
async function someFailedAction(someParam) {
  await sleep(500);
  throw new Error(someParam);
}

async function someSucceedAction(someParam) {
  await sleep(300);
  return someParam;
}

queue.push(someFailedAction, 'fizz');
queue.push(someSucceedAction, 'buzz').then(result => {
  console.log(result); // Will print object: { args: ['bar'], error: null, result: 'buzz' }
})
```

Failed task returns error instead of result:

```javascript
async function someAnotherFailedAction(someParam) {
  await sleep(400);
  throw new Error(someParam);
}
queue.push(someAnotherFailedAction, 'failed').then(result => {
  console.log(result); // Will print object: { args: ['bar'], error: Error('failed'), result: null }
});
```
