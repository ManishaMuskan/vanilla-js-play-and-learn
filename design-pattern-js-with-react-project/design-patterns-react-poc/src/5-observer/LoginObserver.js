class LoginObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((f) => f !== func);
  }

  notify(value) {
    this.observers.forEach((func) => func(value));
  }
}

const instance = new LoginObserver();
export default instance;
