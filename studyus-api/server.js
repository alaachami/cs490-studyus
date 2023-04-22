const app = require('./app')
const {PORT} = require("./config")
const cors = require('cors');

//const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`)
})