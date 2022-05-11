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
    console.log(source, target, event);
    if (!this.links[source]) this.links[source] = {};
    this.links[source][event] = target;
  }

  addLinks(links) {
    Array.from(Object.keys(links)).forEach((key) => {
      const link = links[key];
      link.forEach((l) => {
        this.addLink(key, l.target, l.event);
      });
    });
  }

  addVariable(name, value) {
    if (this.variables[name] !== undefined)
      throw new Error(`variable ${name} already exists`);
    this.variables[name] = value;
  }

  setVariable(name, value) {
    this.variables[name] = value;
  }

  getVariable(name) {
    if (this.variables[name]) return this.variables[name];

    throw new Error(`variable ${name} does not exist`);
  }

  triggerStateEvent(event) {
    console.log(event);
    const eventName = this.processEvent(event);
    const links = this.getLinks();
    console.log(links);
    if (!links) return false;
    const link = links[eventName];

    if (link) {
      this.setNode(link);
      return link;
    }
    return false;
  }

  processEvent(event) {
    if (event.name && typeof event.name === "string") return event.name;
    return event.funct.apply(this);
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
