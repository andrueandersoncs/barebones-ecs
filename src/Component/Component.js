class Component {
  constructor(type, properties) {
    this.type = type;

    for (var key in properties) {
      this[key] = properties[key];
    }
  }
  
  static isValidComponent(component) {
    return typeof component.type === 'string' && component.type.length > 0;
  }
}

export default Component;
