import winston from 'winston'

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const today = new Date();
const logFilename = `./src/logs/express-log_${today.getDate() + 1}_${today.getMonth() + 1}_${today.getFullYear()}.log`
const timeString = new Date().toLocaleTimeString();


export const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        process.env.NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `[${timeString}] ${level.toUpperCase()}: ${message}`)
    ),
    transports: [
        new (winston.transports.File)({ filename: logFilename })
    ],
});