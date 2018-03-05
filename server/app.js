const {createServer} = require('http')
const {ensureDir} = require('fs-extra')
const _ = require('lodash')
const express = require('express')
const socketIo = require('socket.io')
const helmet = require('helmet')
const session = require('express-session')
const LevelStore = require('level-session-store')(session)
const config = require('./config')
const {host, port} = require('../common/config')
const logger = require('./logger')
const chat = require('./chat')

const setup = () => {
  const app = express()
  const server = createServer(app)
  // utworzenie socketu
  const io = socketIo(server, {})
  // inicjalizacja czatu
  chat.init(io)

  app.use(helmet())

  // utworzenie sesji
  const sessionMiddleware = session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: env !== 'development'},
    // for larger, distributed, APIs use redis or something else instead
    store: new LevelStore(config.sessionStorePath)
  })
  app.use(sessionMiddleware)

  // kopiuje sesje NodeJs do socket.io
  io.use((socket, next) => sessionMiddleware(socket.request, socket.request.res, next))

  // zapisuje informacje o sesji użytkownika
  io.use((socket, next) => {
    const user = _.get(socket, 'request.session.user');
    if (user) {
      socket.user = user
    }
    return next()
  })

  // zapisywanie użytkowników
  app.use(express.static('public'))

  app.use((err, req, res, next) => {
    logger.error({err})

    if (!res.headersSent) {
      res.status(500).send()
    }
  })

  // komunikat o starcie serwera
  return new Promise((resolve, reject) => {
    return server.listen(port, host, (err) => {
      if (err) {
        return reject(err)
      }
      logger.info(`Server listening on ${host}:${port}`)
      return resolve(server)
    })
  })
}

const onError = (err) => {
  logger.error(err)
  setTimeout(() => {
    process.exit(1)
  }, 1000) // given the logger time to write a logs
}

ensureDir(config.sessionStorePath)
  .then(setup)
  .catch(onError)

process.on('uncaughtException', onError)
