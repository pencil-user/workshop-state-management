"use strict"

const config = require('config')
const express = require('express')

require('express-async-errors');
//require('./database/mongoose.js')

const settingsRoute = require('./routes/settingsRoute.js')
const employeesRoute = require('./routes/employeesRoute.js')
const inactiveEmployeesRoute = require('./routes/inactiveEmployeesRoute.js')

const errorHandling = require('./middleware/errorHandling.js');
const cors = require('./middleware/cors.js');

const app = express()

app.use(cors)

app.use(
    (req, res, next) => setTimeout(next, 1000 + Math.random() * 2500))

app.use(express.json())

app.use('/api/settings', settingsRoute)
app.use('/api/employees', employeesRoute)
app.use('/api/inactive', inactiveEmployeesRoute)
app.use('/', errorHandling)

app.listen(config.get('port'), () => console.log('server working at ' + config.get('port')))
