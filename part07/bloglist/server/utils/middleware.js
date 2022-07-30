const loggers = require('./loggers')

const requestLogger = (req, res, next) => {
  loggers.info('Method:', req.method)
  loggers.info('Path:', req.path)
  loggers.info('Body', req.body)
  loggers.info('---')
  next()
}

const unknownEndpoint = (req, res) =>
  res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (err, req, res, next) => {
  loggers.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'validation error' })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }
  else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  next(err)
}

const getTokenFrom = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    req.token = authorization.substring(7)
  else
    req.token = null

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom
}