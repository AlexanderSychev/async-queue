import { EventEmitter } from '../event-emitter';

test('"EventEmitter.on" method test', () => {
  const events = {
    foo: 'foo',
    bar: 'bar',
  };

  const onFoo = jest.fn();
  const onBar = jest.fn();

  const emitter = new EventEmitter();

  emitter.on(events.foo, onFoo);
  emitter.on(events.bar, onBar);

  emitter.emit(events.foo);
  expect(onFoo).toHaveBeenCalled();
  expect(onBar).not.toHaveBeenCalled();

  onFoo.mockReset();
  onBar.mockReset();
  emitter.emit(events.bar);
  expect(onFoo).not.toHaveBeenCalled();
  expect(onBar).toHaveBeenCalled();
});

test('"EventEmitter.off" method test', () => {
  const fooEvent = 'foo';
  const onFoo = jest.fn();
  const emitter = new EventEmitter();

  emitter.on(fooEvent, onFoo);
  emitter.emit(fooEvent);

  emitter.off(fooEvent, onFoo);
  emitter.emit(fooEvent);

  expect(onFoo).toHaveBeenCalledTimes(1);
});

test('"EventEmitter.once" method test', () => {
  const fooEvent = 'foo';
  const onFoo = jest.fn();
  const emitter = new EventEmitter();

  emitter.once(fooEvent, onFoo);
  emitter.emit(fooEvent);
  emitter.emit(fooEvent);

  expect(onFoo).toHaveBeenCalledTimes(1);
});
