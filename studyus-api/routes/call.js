//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Calls = require("../models/calls")
const security = require("../middleware/security")
const axios = require('axios')
const bearer = process.env.DAILYCO_API_KEY


router.post('/create', async (req, res, next) => {

    const { name } = req.body
    const { maxParticipants } = req.body 


    try {
      const body = {
        name: name,
        properties: {
          max_participants: maxParticipants,
          autojoin: true,
          enable_knocking: true
        },
        privacy: 'public'
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + bearer
        }
      };
      const response = await axios.post('https://api.daily.co/v1/rooms', body, config);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  });




//MODULE EXPORTS
module.exports = router