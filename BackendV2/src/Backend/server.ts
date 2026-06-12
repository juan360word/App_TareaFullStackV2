import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
import { connectDB } from './config/DBmongo';
import router from './Routes/RoutesProye';
import cors from 'cors'
import {corsConfig} from './config/cors'
import morgan from 'morgan'

require('dotenv').config();
connectDB();

const server = express();
server.use(express.json());

server.use(cors(corsConfig))

server.use(morgan('dev'))

server.use('/api/Proyectos', router)

server.use(express.static(path.join(__dirname, '../../../FrontendV2/dist')))

server.use((req, res) => {
    res.sendFile(path.join(__dirname, '../../../FrontendV2/dist/index.html'))
})

export default server

