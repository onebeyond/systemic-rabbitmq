const { has, get } = require('lodash');

module.exports = options => {

  const RabbitClient = get(options, 'RabbitClient') || require('rascal');
  let broker;
  let config;
  let logger;

  const init = dependencies => {
    config = { ...dependencies.config };
    logger = ({ ...dependencies.logger }) || console;

    if (!dependencies.logger) {
      logger.info = console.log;
    }
  };

  const validate = () => {
    if (!has(config, 'vhosts'))
      throw new Error('config.vhosts is required');
  };

  const start = async dependencies => {
    try {
      init(dependencies);
      validate();

      logger.info('Connecting to rabbitmq');
      const conf = RabbitClient.withDefaultConfig(config);

      broker = await RabbitClient?.BrokerAsPromised?.create(conf);

      if (!broker) {
        throw new Error('Broker could not be created');
      }
console.log('broker', broker)
      return broker;
    } catch (error) {
      throw new Error(error);
    }
  };

  const stop = async () => {
    logger.info('Disconnecting rabbitmq');
    if (!broker) {
      logger.info('No broker was active');
      return;
    }
    await broker.shutdown();
  };

  return {
    start,
    stop,
  };
};
