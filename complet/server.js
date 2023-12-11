// Serveur express pour prévisualiser le montage

import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.static('dist'))

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(port)

console.log(__dirname)
console.log('Server started at http://localhost:' + port)
