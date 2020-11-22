const { getToken, setTokenCookie } = require('../helpers/oauth')

module.exports = {
  async get(request, response) {
    const token = await getToken()
    setTokenCookie(token, response)

    // example request
    // https://eu.api.blizzard.com/profile/wow/character/blackhand/martyro?namespace=profile-eu&locale=en_GB&access_token=<<key>>

    response.status(200).send({ token })
  },
}
