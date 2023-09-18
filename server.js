const express = require('express')
const app = express()
const router = require('./routes/index.js');
const { globalErrorHandler } = require('./errorhandler/errorHandler.js');
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use(globalErrorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})