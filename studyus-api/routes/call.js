//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Calls = require("../models/calls")
const security = require("../middleware/security")
const axios = require('axios')
const bearer = process.env.DAILYCO_API_KEY


router.post('/create', async (req, res, next) => {

    const { name } = req.body
    const expiryTimeInSeconds = 3600; // or any other value in seconds
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + bearer
      }}

    //If the room exists, delete it before creating it again to avoid error
    try {
      const existingRoom = await axios.get('https://api.daily.co/v1/rooms/' + name, config); 
      if (existingRoom) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + bearer
          }
        };
        await axios.delete('https://api.daily.co/v1/rooms/' + name, config);
    }} catch(error){}
    // Now, create the room based on the given name
    try {
      const body = {
        name: name,
        properties: {
          autojoin: true,
          enable_knocking: true,
          exp: Math.floor((Date.now() / 1000) + expiryTimeInSeconds)
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
      next(error)
    }
  });

  router.post('/delete', async (req, res, next) => {
    const { name } = req.body
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + bearer
        }
      };
      const response = await axios.delete('https://api.daily.co/v1/rooms/' + name, config);
      res.status(200).json(response.data);
    } catch (error) {
      next(error)
    }
  });



//MODULE EXPORTS
module.exports = router