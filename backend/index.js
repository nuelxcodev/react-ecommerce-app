import express, { urlencoded } from 'express';
import router from './routes/router.js';
import cors from "cors"
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()


const app = express();
const PORT = 8080

app.use(express.json());
app.use(cors())
app.use(cookieParser())


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next();
})

app.use('/api', router)


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connection established")
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
}).catch((err) => console.log(err))

