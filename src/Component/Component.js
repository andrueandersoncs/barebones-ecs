class Component {
  constructor(type, properties) {
    this.type = type;

    for (var key in properties) {
      this[key] = properties[key];
    }
  }
  
  static isValidComponent(candidate) {
    return typeof candidate.type === 'string';
  }
}

export default Component;
