const http = require('http')
const app = require('./app')

const config = require('./utils/config')
const loggers = require('./utils/loggers')
const server = http.createServer(app)

server.listen(config.PORT, () =>
  loggers.info(`Server running on port http://localhost:${config.PORT}`)
)