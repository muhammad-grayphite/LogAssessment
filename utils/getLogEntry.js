'use strict'

exports.getLogEntry = function getLogEntry(source, index) {
    let logEntry = source.pop()
    return logEntry ? { ...logEntry, 'index': index } : false
}



