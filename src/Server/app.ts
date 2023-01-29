
import express from 'express'
import { db} from '../Config/db.config'
import { router } from '../Routes/routes'
import cookieParser from 'cookie-parser'

import cors from 'cors'


const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    // origin: "https://todo-8ocs6olvs-racheal777.vercel.app",
    origin: "http://localhost:3000",
     methods: "GET, POST, OPTIONS, PUT, DELETE",
 
}))


//routes
app.use('/api/v1', router)

//db connection then servee connection
db.then(() => {
    app.listen(7070, () => console.log('Server is listening on port 7070'))
})



