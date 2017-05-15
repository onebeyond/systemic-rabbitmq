var async = require('async')
var get = require('lodash.get')
var has = require('lodash.has')

module.exports = function(options) {

    var RabbitClient = get(options, 'RabbitClient') || require('rascal')
    var components = get(options, 'components') || {}
    var broker
    var config
    var logger

    function init(dependencies, cb) {
        config = dependencies.config
        logger = dependencies.logger || console
        cb()
    }

    function validate(cb) {
        if (!has(config, 'vhosts')) return cb(new Error('config.vhosts is required'))
        cb()
    }

    function start(cb) {
        logger.info('Connecting to rabbitmq')
        var conf = RabbitClient.withDefaultConfig(config);

        RabbitClient.createBroker(conf, components, function(err, _broker) {
            broker = _broker;
            cb(err, { broker: broker });
        })
    }

    function stop(cb) {
        if (!broker) return cb()
        logger.info('Disconnecting rabbitmq')
        broker.shutdown(cb)
    }

    return {
        start: async.seq(init, validate, start),
        stop: stop
    }
}
