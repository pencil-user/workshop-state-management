"use strict"

function errorHandling(error, req, res, next) {
    if ("httpCode" in error) {
        console.log('Error code:', error.httpCode, 'Error type:', error.type, 'Error message:', error.message)
        res.status(error.httpCode).json({ error: error.message, type: error.type })
    }
    else {
        console.log('Error message:', error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = errorHandling