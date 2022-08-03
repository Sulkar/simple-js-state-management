let instance;

export class State {
  
  static get instance() {
    return instance ? instance : (instance = new State());
  }

  constructor() {
    this.state = new Map();
    this.state.set("subscribers", new Array());
  }

  getState() {
    return this.state;
  }

  getValue(key) {
    return this.state.get(key);
  }

  editState(key, value) {
    this.state.set(key, value);
    this.checkSubscribers(key);
  }

  checkSubscribers(key) {
    this.state.get("subscribers").forEach((subscriber) => {
      if (subscriber.trigger === key) {
        subscriber.function();
      }
    });
  }

  subscribe(component) {
    if (!this.state.get("subscribers").includes(component)) {
      this.state.get("subscribers").push(component);
    }
  }

  unsubscribe(name) {
    let unsubscribeIndex = null;
    this.state.get("subscribers").forEach((subscriber, index) => {
      if (subscriber.name === name) {
        unsubscribeIndex = index;
      }
    });
    if (unsubscribeIndex != null) {
      this.state.get("subscribers").splice(unsubscribeIndex, 1);
    }
  }
}
