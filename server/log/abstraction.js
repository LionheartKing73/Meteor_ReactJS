const winston = require('winston');
                require('winston-logstash');

Meteor.methods({
  /**
    * @method logging
    * send loggers events to Logstash host
    */
  logging: function(level, message, metaData){
    const logstash = new winston.transports.Logstash({
      port: 5000 ,
      host: 'elk.sciensa.click',
      label: 'Meteor-Dev'
    });

    logstash.on('error', function(err) {
      console.error(err); // replace with your own functionality here
    });

    winston.loggers.add('Meteor-Dev', {
      transports: [
        logstash 
      ]
    });

    const channel = winston.loggers.get('Meteor-Dev');
    switch (level) {
      case "info":
        channel.info(message, metaData);
        break;
      case "warn":
        channel.warn(message, metaData);
        break;
      case "error":
        channel.error(message, metaData);
        break;
      default:
        channel.info(message, metaData);
        break;
    };
  }
});
