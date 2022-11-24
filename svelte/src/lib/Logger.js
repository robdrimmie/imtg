let _log = []
let _level = 100

export default class Logger {
    // Considering a level called "interface" which is for messages visible to the user
    static LEVEL_DEBUG = 100
    static LEVEL_INFO = 200

    static log(level = 0, message = '') {
        if (level < _level) {
            return 
        }

        _log.push({
            level,
            message
        })
    }

    static debug(message) {
        Logger.log(Logger.LEVEL_DEBUG, message)
    }

    static info(message) {
        Logger.log(Logger.LEVEL_INFO, message)
    }

    static getLog(reversed = false) {
        return reversed
            ? [..._log].reverse()
            : _log
    }
}