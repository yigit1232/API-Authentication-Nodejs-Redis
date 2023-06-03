const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const indexRouter = require('./routes/index.router')

require('./config/config').config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', indexRouter)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
