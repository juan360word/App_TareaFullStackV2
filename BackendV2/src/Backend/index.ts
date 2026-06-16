import { connectDB } from './config/DBmongo'
import server from "./server";

const port = process.env.PORT || 4000

const start = async () => {
    await connectDB()
    server.listen(port, () => {
        console.log(`Se esta llamando a la API por el puerto ${port}`)
    })
}

start()



