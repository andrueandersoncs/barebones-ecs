# barebones-ecs

A barebones Entity Component System.

# Usage

Simply create an instance of Engine:
`const engine = new Engine();`

Optionally pass in your entities and systems:
```
const entities = {};
const systems = [];
const engine = new Engine(entities, systems);
```

Then call `engine.start();`

# Goals

1. Usability
  * Simple API
  * Fully functional ECS
  * Nothing extra, only the building blocks

2. Test Coverage
  * 100% test coverage
  * Every interface covered by tests
  * Testing positive and negative (API does what it says, doesn't do what it doesn't say)

3. Documentation
  * Extensive documentation (Each function documented)
  * Usable without needing to view source
  * Coverage of all effects and side effects (if there are any) of each interface