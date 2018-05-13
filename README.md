# barebones-ecs

A barebones Entity Component System.

# Usage

Simply create an instance of Engine:
`const engine = new Engine();`

Optionally pass in your entities and systems:
```const entities = {};
const systems = [];
const engine = new Engine(entities, systems);```

Then call `engine.start();`