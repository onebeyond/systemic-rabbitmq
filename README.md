# systemic-rabbitmq
A [systemic](https://github.com/guidesmiths/systemic) rabbitmq component

It uses [rascal](https://github.com/guidesmiths/rascal) to set up configuration for rabbitmq

## Usage
```js
const System = require('systemic')
const rabbitmq = require('systemic-rabbitmq')

new System({ name: 'rabbit' })
    .add('logger', console)
    .add('rabbitmq', rabbitmq()).dependsOn('config', 'logger')
    .start((err, components) => {
        // Do stuff with components.rabbitmq
    })
```
