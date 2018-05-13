# barebones-ecs

A barebones Entity Component System.

# Installation

1. Clone the code
2. `lib` folder contains the framework, simply `const Component = include('lib/Component');`

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

# Contribution

1. `git clone` the repo
2. `npm install` at the base directory
3. Make your changes to the `src/` files
4. Test each new interface *especially members of any new classes* (please see goals to ensure the highest chance that your contribution will be accepted)
5. `npm run test` to build the `lib/` files and run the tests
6. Optionally, to only build the `lib/` files, run `npm run build`

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