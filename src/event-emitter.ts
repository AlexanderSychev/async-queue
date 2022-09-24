import type { EventListener } from './types';
import { isNil } from './utils';

/** Naive event emitter implementation */
export class EventEmitter {
  /** Listeners dictionary object where key is event name and value is array of attached listeners */
  private listeners: Record<string, EventListener[]> = {};

  /**
   * Attach listener to event
   *
   * @param event Event name (`string` value)
   * @param listener Event listener (function which can receive any arguments and return any value)
   */
  public on = (event: string, listener: EventListener): void => {
    if (isNil(this.listeners[event])) {
      this.listeners[event] = [];
    }

    // Add listener only if it's not already added
    const index = this.listeners[event].findIndex(item => item === listener);
    if (index === -1) {
      this.listeners[event].push(listener);
    }
  }

  /**
   * Attach listener to event. Detach listener after first event emit.
   *
   * @param event Event name (`string` value)
   * @param listener Event listener (function which can receive any arguments and return any value)
   */
  public once = (event: string, listener: EventListener): void => {
    const internal = (...args: any[]): any => {
      const result = listener(...args);
      this.off(event, internal);
      return result;
    };
    this.on(event, internal);
  }

  /**
   * Detach listener from event
   *
   * @param event Event name (`string` value)
   * @param listener Event listener (function which can receive any arguments and return any value)
   */
  public off = (event: string, listener: EventListener): void => {
    if (!isNil(this.listeners[event])) {
      this.listeners[event] = this.listeners[event].filter(item => item !== listener);

      // Cleanup empty listeners set
      if (this.listeners[event].length == 0) {
        delete this.listeners[event];
      }
    }
  }

  /**
   * Emit event - call all listeners attached to it
   *
   * @param event Event name (`string` value)
   * @param args Additional arguments to pass to listeners
   */
  public emit = (event: string, ...args: any[]): void => {
    if (!isNil(this.listeners[event])) {
      this.listeners[event].forEach(listener => listener(...args));
    }
  }
}
