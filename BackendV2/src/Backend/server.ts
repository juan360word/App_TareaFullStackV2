import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/DBmongo';
import router from './Routes/RoutesProye';

require('dotenv').config();
connectDB();

const server = express();
server.use(express.json());

//Routes

server.use('/api/Proyectos',router)
//server.use('/api/Autenticacion')


export default server

