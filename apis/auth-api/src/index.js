const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')

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

const config = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://eu.battle.net',
  },
}

const { ClientCredentials } = require('simple-oauth2')

async function getToken() {
  const client = new ClientCredentials(config)

  const tokenParams = {
    scopes: 'wow.profile',
  }

  try {
    const accessToken = await client.getToken(tokenParams)
    return accessToken
  } catch (error) {
    console.log('Access Token error', error.message)
  }
}

getToken()

app.use('/', async (req, res) => {
  const token = await getToken()

  // TODO -> Better way to handle token -> use cookie
  
  // example request
  // https://eu.api.blizzard.com/profile/wow/character/blackhand/martyro?namespace=profile-eu&locale=en_GB&access_token=<<key>>
  
  res.status(200).send({ token })
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(chalk.white.bgGreen.bold(' Server running ') + ` ${process.env.NODE_ENV} mode on port ${PORT}`),
)
