const axios = require('axios')
require('dotenv').config()

const API_TOKEN = process.env.API_TOKEN
const API_URL = process.env.API_URL

if (!API_TOKEN || !API_URL) {
  throw new Error('API_TOKEN tai API_URL puuttuu! Tarkista .env-tiedosto.')
}

async function createGame() {
  try {
    const response = await axios.post(`${API_URL}/game`, null, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const gameId = response.data.gameId
    const gameStatus = response.data.status
    return { gameId, gameStatus }
  } catch (error) {
    console.error(
      'Odottamaton virhe pelin luonnissa:',
      error.response?.data || error.message
    )
    return null
  }
}

async function takeAction(takeCard, gameId) {
  try {
    const action = { takeCard }
    const response = await axios.post(
      `${API_URL}/game/${gameId}/action`,
      action,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    )

    return response.data.status
  } catch (error) {
    console.error(
      'Odottamaton virhe pelin aikana:',
      error.response?.data || error.message
    )
    return null
  }
}

module.exports = { createGame, takeAction }
