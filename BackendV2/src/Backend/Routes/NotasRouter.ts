import { Router } from "express";
import { body, param } from "express-validator";
import { entradaError } from "../Middleware/validacion";
import { NotaController } from "../Controllers/NotasController";
import { ValidacionProyectosExistan } from "../Middleware/Proyecto";
import { ValidacionTareasExistan } from "../Middleware/Tarea";
import { MiddlewareAuth } from "../Middleware/Auth";

const NotasRouter = Router()
NotasRouter.use(MiddlewareAuth)


NotasRouter.post('/:proyectoid/tareas/:id/notas',
    body('contenido').notEmpty().withMessage('El contenido de la nota es Obligatorio'),
    entradaError,
    ValidacionProyectosExistan,
    ValidacionTareasExistan,
    NotaController.createNota
)

NotasRouter.get('/:proyectoid/tareas/:id/notas',
    entradaError,
    ValidacionProyectosExistan,
    ValidacionTareasExistan,
    NotaController.GetNota
)

NotasRouter.delete('/:proyectoid/tareas/:id/notas/:notasId',
    param('notasId').isMongoId().withMessage('ID no valido'),
    entradaError,
    ValidacionProyectosExistan,
    ValidacionTareasExistan,
    NotaController.EliminarNota
)


export default NotasRouter


