import server from "./server";

const port = process.env.Port || 4000

server.listen(port,() => {
    console.log("Se esta llamando a la APi por el puerto 4000")
})



