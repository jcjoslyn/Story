/*
    The state manager could be based off the publish subscribe module,
    digesting events and turning them into state changes, each state having
    nodes that lead to other nodes, given certain state changes

    When the state of the manager changes, it uses the publish subscribe to
    emit an event of its own
*/

export class StateMap {
  currentNode = "default";
  links = {
    default: {},
  };
  variables = {};

  getCurrentNode() {
    return this.currentNode;
  }

  setNode(name) {
    this.currentNode = name;
  }

  getLinks() {
    return this.links[this.currentNode];
  }

  addLink(source, target, event) {
    if (!this.links[source]) this.links[source] = {};
    this.links[source][event] = target;
  }

  addLinks(arr) {
    arr.forEach((link) => this.addLink(link.source, link.target, link.event));
  }

  addVariable(name, value) {
    if (this.variables[name] !== undefined)
      throw new Error(`variable ${name} already exists`);
    this.variables[name] = value;
  }

  setVariable(name, value) {
    this.variables[name] = value;
  }

  triggerStateEvent(event) {
    const links = this.getLinks();
    if (!links) return false;
    const link = links[event.name];

    if (link) {
      this.setNode(link);
      return link;
    }
    return false;
  }
}

export class StateNode {
  linkedNodes = {};
  callFunction;
  interruptable = true;
  running = false;
  interrupted = false;

  constructor({ call, interruptable = true }) {
    if (!interruptable) this.interruptable = false;
    this.callFunction = call;
  }

  call(event) {
    return new Promise((resolve, reject) => {
      this.running = true;
      this.callFunction(event.data).then((value) => {
        if (this.interrupted) {
          this.interrupted = false;
          resolve(false);
          return;
        }
        this.running = false;
        if (value) {
          if (value === "repeat") {
            this.call(event);
            resolve(false);
          } else {
            resolve(value);
          }
        }
        resolve(false);
      });
    });
  }

  interrupt() {
    if (!this.interruptable) return;
    this.interrupted = true;
  }
}

export function Action(state, funct, args) {
  if (state.interrupted) return;
  return funct(args);
}

export class StateEvent {
  name;
  data;

  constructor({ name, data }) {
    this.name = name;
    this.data = data;
  }
}
