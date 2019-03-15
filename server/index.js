const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const api = require('./api')

const app = express()

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: 'REST API for Batta',
      version: '1.0.0',
      description: 'This is the REST API for my product'
    },
    host: 'localhost:3000',
    basePath: '/api'
  },
  apis: ['./docs/*.yaml']
})

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/api', api())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(3000, async () => {
  console.log(`🌝 App listening on port 3000`)
  console.log('🌚 Press Ctrl+C to quit.')
})
