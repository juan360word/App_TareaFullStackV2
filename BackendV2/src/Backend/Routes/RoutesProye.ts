import { Router } from "express";
import { body,param } from "express-validator"; 
import  {ProyectoController}  from "../Controllers/ProyeController";
import { entradaError } from "../Middleware/validacion";
import { TareaController } from "../Controllers/TareaController";
import { ValidacionProyectosExistan } from "../Middleware/Proyecto";
import { ValidacionTareasExistan, QuienEliminaTareas } from "../Middleware/Tarea";
import { MiddlewareAuth } from "../Middleware/Auth";



const router = Router()
router.use(MiddlewareAuth)
router.post('/',
body('proyectoName').notEmpty().withMessage('No dejar vacio,OBLIGATORIO'),
body('clientename').notEmpty().withMessage('Nombre,OBLIGATORIO'),
body('description').notEmpty().withMessage('¿Que quieres decir?,OBLIGATORIO'),
entradaError,ProyectoController.CreateProyectoPost)




router.get('/',ProyectoController.getTodosProyectos)

router.get('/:id',param('id').isMongoId().withMessage('ID no valido'),entradaError,ProyectoController.getLlamadoID)

// Actualizar
router.put('/:id',param('id').isMongoId().withMessage('ID no valido'),
body('proyectoName').notEmpty().withMessage('No dejar vacio,OBLIGATORIO'),
body('clientename').notEmpty().withMessage('Nombre,OBLIGATORIO'),
body('description').notEmpty().withMessage('¿Que quieres decir?,OBLIGATORIO'),
entradaError,ProyectoController.UpdateProyecto)

router.delete('/:id',param('id').isMongoId().withMessage('ID no valido'),entradaError,ProyectoController.DeleteProyecto)

// Router de tareas

router.post('/:proyectoid/tareas',body('name').notEmpty().withMessage('No de dejar vacio (Nombre)'),
body('description').notEmpty().withMessage('No de dejar vacio (Descripcion)')
,entradaError,ValidacionProyectosExistan,TareaController.CreateTask)

// Validacion de tarea

router.get('/:proyectoid/tareas',ValidacionProyectosExistan,TareaController.GetTask)
router.get('/:proyectoid/tareas/:id',param('id').isMongoId().withMessage('ID no valido'),entradaError,
ValidacionProyectosExistan,ValidacionTareasExistan,QuienEliminaTareas,TareaController.GetTaskID)

// Actualizacion
router.put('/:proyectoid/tareas/:id',param('id').isMongoId().withMessage('ID no valido'),
body('name').notEmpty().withMessage('No de dejar vacio (Nombre)'),
body('description').notEmpty().withMessage('No de dejar vacio (Descripcion)'),
entradaError,ValidacionProyectosExistan,ValidacionTareasExistan,QuienEliminaTareas,TareaController.UpdateTarea)

// delete

router.delete('/:proyectoid/tareas/:id',param('id').isMongoId().withMessage('ID no valido'),entradaError,
ValidacionProyectosExistan,ValidacionTareasExistan,QuienEliminaTareas,TareaController.DeleteTarea)

router.post('/:proyectoid/tareas/:id/estado',param('id').isMongoId().withMessage('ID no valido'),
body('estado').notEmpty().withMessage('Que cambio hiciste?'),entradaError,
ValidacionProyectosExistan,ValidacionTareasExistan,QuienEliminaTareas,TareaController.UpdateEstados)


// Router de miembros

router.post('/:id/members',
param('id').isMongoId().withMessage('ID no valido'),
body('userId').isMongoId().withMessage('ID de usuario no valido'),
entradaError,ProyectoController.AddMember)

router.delete('/:id/members/:userId',
param('id').isMongoId().withMessage('ID no valido'),
param('userId').isMongoId().withMessage('ID de usuario no valido'),
entradaError,ProyectoController.RemoveMember)

export default router
