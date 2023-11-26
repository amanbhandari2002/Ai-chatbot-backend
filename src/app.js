import express from  'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors"

config();
const app=express();
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser(process.env.COOKIE_SECURITY,))
app.use(express.json());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




app.use("/api/v1",appRouter)
console.log("testtt")

export default app;