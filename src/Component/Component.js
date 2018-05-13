class Component {
  constructor(type, properties) {
    this.type = type;

    for (var key in properties) {
      this[key] = properties[key];
    }
  }
  
  static isValidComponent(component) {
    return Component.isValidComponentType(component.type);
  }

  static isValidComponentType(type) {
    return typeof type === 'string' && type.length > 0;
  }
}

export default Component;
