const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors } = format

const buildDevLogger = () => {

  const logFormat = printf(({level, message, timestamp, stack}) => {
    return `${timestamp} ${level}: ${stack || message}`
  })
  
  return createLogger({
    level: 'debug',
    format: combine(
      format.colorize(), 
      timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), 
      errors({stack: true}),
      logFormat,
      ),
    defaultMeta: { service: 'user-service-dev' },
    transports: [
  
      new transports.Console()
    ],
  });
  
}

module.exports = buildDevLogger;