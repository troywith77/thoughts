// Facebook

// my solution
class Emitter {
  // our Emitter needs a pool to save all subscribed callbacks
  constructor() {
    this.eventPool = {}
  }
  subscribe(eventName, callback) {
    this.eventPool[eventName] = callback
    const release = () => {
      delete this.eventPool[eventName]
    }
    return {
      release
    }
  }
  emit(eventName) {
    if (!this.eventPool[eventName]) throw new Error(`${eventName} is not subscribed.`)
    this.eventPool[eventName].apply(null, arguments)
  }
}


// use example

const emitter = new Emitter();

// 1. Support subscribing to events.
const sub = emitter.subscribe('event_name', callback);

// 2. Support emitting events.
// This particular example should lead to the `callback` above being invoked with `foo` and `bar` as parameters.
emitter.emit('event_name', 'foo', 'bar');

// 3. Support unsubscribing existing subscriptions by releasing them.
sub.release(); // `sub` is the reference returned by `subscribe` above

emitter.emit('event_name', 'foo', 'bar'); // error