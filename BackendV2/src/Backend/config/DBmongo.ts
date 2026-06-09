import  mongoose  from 'mongoose'

import { exit } from 'node:process';


export const connectDB = async () => {
    try {
        const conectado = await mongoose.connect(process.env.MONGO_URI as string)
        const url = `${conectado.connection.host}:${conectado.connection.port}`
        console.log('Base de datos conectada',url)
    } catch (error) {
        console.log('Error al conectar')
        exit(1)
    }
}