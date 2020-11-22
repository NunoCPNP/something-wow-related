const { ClientCredentials } = require('simple-oauth2')
let myToken = null

const config = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://eu.battle.net',
  },
}

async function getToken() {
  const client = new ClientCredentials(config)

  const tokenParams = {
    scopes: 'wow.profile',
  }

  if (myToken === null || myToken.expired()) {
    const accessToken = await client.getToken(tokenParams)
    myToken = accessToken
    return accessToken
  } else {
    return myToken
  }
}

function setTokenCookie(token, response) {
  const {
    token: { access_token, expires_at },
  } = token

  response.cookie('token', access_token, {
    expires: expires_at,
    HttpOnly: true,
  })
}

exports.getToken = getToken
exports.setTokenCookie = setTokenCookie
