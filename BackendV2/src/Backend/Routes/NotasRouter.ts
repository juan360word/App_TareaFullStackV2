import { Router } from "express";
import { body, param } from "express-validator";
import { entradaError } from "../Middleware/validacion";
import { NotaController } from "../Controllers/NotasController";


const NotasRouter = Router()


NotasRouter.post('/:proyectoid/tareas/:id/notas',
    body('contenido').notEmpty().withMessage('El contenido de la nota es Obligatorio'),
    entradaError,NotaController.createNota

)

NotasRouter.get('/:proyectoid/tareas/:id/notas',
    entradaError,
    NotaController.GetNota
)

NotasRouter.delete('/:proyectoid/tareas/:id/notas/:notasId',
    param('nodeId').isMongoId().withMessage('ID no valido'),
    entradaError,
    NotaController.EliminarNota
)


export default NotasRouter


