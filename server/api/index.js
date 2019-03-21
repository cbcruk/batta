const { version } = require('../package.json')
const { Router } = require('express')
const articles = require('./articles')
const users = require('./users')
const region = require('./region')
const search = require('./search')
const address = require('./address')

function api() {
  const api = Router()

  api.use('/articles', articles())
  api.use('/users', users())
  api.use('/region', region())
  api.use('/search', search())
  api.use('/address', address())

  api.get('/', (_req, res) => {
    res.json({ version })
  })

  return api
}

module.exports = api