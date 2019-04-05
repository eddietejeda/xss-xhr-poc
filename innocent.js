const express = require('express')
const app = express()
const port = 4000

app.use('/', express.static('public'))

app.listen(port, () => console.log(`This server is listening on port ${port} and presents a basic static file host!`))
