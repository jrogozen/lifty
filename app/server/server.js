import api from './api'
import compression from 'compression'
// import config from '../webpack.config.babel'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
// import reactMiddleware from './middleware/reactMiddleware'
// import webpack from 'webpack'

require('./db')

const DEBUG = process.env.NODE_ENV !== 'production'
const server = express()

server.set('env', DEBUG ? 'development' : 'production')
server.set('port', process.env.PORT || 3000)
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(cookieParser())

server.use(compression())

if (DEBUG) {
  // const compiler = webpack(config)
  // const webpackHotMiddleware = require('webpack-hot-middleware')
  // const webpackMiddleware = require('webpack-dev-middleware')

  // server.use(morgan('dev'))
  // server.use(webpackMiddleware(compiler, {
  //   historyApiFallback: true,
  //   hot: true,
  //   quiet: true
  // }))
  // server.use(webpackHotMiddleware(compiler))
} else {
  server.use(express.static(path.resolve(__dirname, '../build')))
  server.use(morgan('combined'))
}

server.use('/api', api)
// server.use(reactMiddleware)

server.listen(server.get('port'), () => {
  console.info(`Server running in ${server.get('env')} on port ${server.get('port')}`) // eslint-disable-line no-console
})