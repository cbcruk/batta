const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(3001, async () => {
  console.log(`🌝 App listening on port 3001`)
  console.log('🌚 Press Ctrl+C to quit.')
})
