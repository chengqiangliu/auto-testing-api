const log4js = require('log4js');

log4js.configure({
    replaceConsole: true,
    appenders: {
        commonOut: {
            type: 'stdout',
            layout: {
                "type": "pattern",
                "pattern": "%d{yyyy-MM-ddThh:mm:ss.SSS}\t[%p]\t[%c]\t|%m"
            }
        },
        workerOut: {
            type: 'dateFile',
            filename: '../log/benben-daigou.log',
            pattern: '.yyyy-MM-dd',
            daysToKeep: 14,
            maxLogSize: 10 * 1024 * 1024,
            layout: {
                "type": "pattern",
                "pattern": "%d{yyyy-MM-ddThh:mm:ss.SSS}\t[%p]\t[%c]\t|%m|\t%z\t%X{FILE_NAME}\t1\t%X{MESSAGE_ID}"
            }
        },
        files: {
            type: 'stdout',
            layout: {
                "type": "pattern",
                "pattern": "%d{yyyy-MM-ddThh:mm:ss.SSS}\t[%p]\t[%c]\t|%m|\t%z\t%X{FILE_NAME}\t1"
            }
        },
    },
    categories: {
        default: {
            appenders: [ 'commonOut' ],
            level: 'info'
        },
        API: {
            appenders: [ 'files' ],
            level: 'info'
        }
    }
});

let logger = {};
logger.API = log4js.getLogger('API');

module.exports = logger;