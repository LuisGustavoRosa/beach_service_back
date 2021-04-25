const express = require('express')
const app = express()
const knex = require('./config/database')
const consign = require('consign')

app.db = knex

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend executando...')
})