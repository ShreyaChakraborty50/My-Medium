import express from 'express'
import cors from 'cors'
import defaultConfig from './config/dbConfig.js'
import router from './routes/blogRouter.js'


const app = express()

var corsOptions = {
    origin: 'https://localhost:8081'
}


//middleware

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routers

app.use('/api',router)


//testing api

app.get('/', (req,res) =>{
    res.json({message: 'API is alive'})
})


//port

const PORT = defaultConfig.generalConfig.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
