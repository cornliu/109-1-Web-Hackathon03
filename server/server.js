import express from 'express'
import cors from 'cors'
import routes from './routes'
import mongoose from 'mongoose'
import {GetContents, CheckAns} from './routes/question'
require('dotenv').config()
const app = express()
const router = express.Router()
export {router}

// init middleware
app.use(cors())
app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

const port = process.env.PORT || 4000
const dboptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  auto_reconnect: true,
  useUnifiedTopology: true,
  poolSize: 10
}
// TODO : connect mongodb here

mongoose.connect(process.env.MONGO_URL, dboptions)
const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')
  // GetContents()
  // CheckAns()
})



routes(app)

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
