import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/DBmongo';
import router from './Routes/RoutesProye';
import cors from 'cors'
import {corsConfig} from './config/cors'


require('dotenv').config();
connectDB();

const server = express();
server.use(express.json());

server.use(cors(corsConfig))
//Routes

server.use('/api/Proyectos',router)
//server.use('/api/Autenticacion')


export default server

