const app = require('./app')
const {PORT} = require("./config")
const cors = require('cors');

//const PORT = process.env.PORT || 3001

// Serve the frontend files from the dist directory
app.use(express.static('../studyus-ui/dist'));

app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`)
})