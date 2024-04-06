import express, { json } from 'express'
import cors from 'cors'

import { createDietRouter } from './routes/diets.js'
import { DietModel } from './models/mongodb/diet.js'

const PORT = process.env.PORT ?? 3000

const app = express()
app.use(json())
app.use(cors())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  console.log(req.socket.remoteAddress)
  res.send('Welcome to my Diet API!')
})

app.use('/diets', createDietRouter({ dietModel: DietModel }))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
