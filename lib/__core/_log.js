/*const winston = require('winston');
require('winston-logstash');

Meteor.startup(() => {
  if (Meteor.isClient) return;

  //TODO: O pacote quebra o app se a conexão falhar
  winston.loggers.add('meu', {
    transports: [
      (new winston.transports.Logstash({
        port: 5000,
        host: 'elk.sciensa.click',
        label: 'acel-corretores-app',
      })),
    ],
  });

  const channel_1 = winston.loggers.get('meu');

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  channel_1.info('Env Variables', process.env);


  console.log = function () {
    if ((arguments.message || '').match('SyncedCron:')) return;

    originalLog(...arguments);

    channel_1.info('console.log', {
      command: 'winston',
      type: 'old_console',
      log_message: arguments.message || JSON.stringify(arguments),
    });
  };

  console.warn = function () {
    originalWarn(...arguments);

    channel_1.warn('console.warn', {
      command: 'winston',
      type: 'old_console',
      log_message: arguments.message || JSON.stringify(arguments),
    });
  };

  console.error = function () {
    if ((arguments.message || '').match('SyncedCron:')) return;
    originalError(...arguments);

    channel_1.error('console.error', {
      command: 'winston',
      type: 'old_console',
      log_message: arguments.message || JSON.stringify(arguments),
    });
  };
});
*/