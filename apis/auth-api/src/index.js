const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')

const { PORT } = require('./config')

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: 'http://localhost:3000' }))
} else {
  app.use(cors({ origin: '' }))
}

const oauthRoute = require('./routes/oauth')

app.use('/oauth', oauthRoute)

app.listen(
  PORT,
  console.log(chalk.white.bgGreen.bold(' Server running ') + ` ${process.env.NODE_ENV} mode on port ${PORT}`),
)
