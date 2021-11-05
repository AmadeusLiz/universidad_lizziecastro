import express, { Router } from 'express'
import { editarDepartamento, crearDepartamento, departamentos, eliminarDepartamento, crearEmpleado, empleados, eliminarEmpleado, editarEmpleado } from '../controllers/authController.js'

const router = express.Router()

// Rutas para las vistas
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/empleados', empleados, (req, res) => {
    // res.render('empleados') // Render, se usa el nombre del archivo pug a mostrar
    res.render('empleados', {empleados: req.empleados, departamentos: req.departamentos, q: req.q})
})

router.get('/departamentos', departamentos, (req, res) => {
    // res.render('empleados') // Render, se usa el nombre del archivo pug a mostrar
    res.render('departamentos', {departamentos: req.departamentos, q: req.q})
})


// // Rutas para los controllers
router.post('/editarDepartamento', editarDepartamento)
router.post('/crearDepartamento', crearDepartamento)
router.post('/crearEmpleado', crearEmpleado)
router.post('/eliminarDepartamento', eliminarDepartamento)
router.post('/eliminarEmpleado', eliminarEmpleado)
router.post('/editarEmpleado', editarEmpleado)
router.post('/empleados', empleados, (req, res) => {
    res.render('empleados', {empleados: req.empleados, departamentos: req.departamentos, empleado: req.empleado})
})

router.post('/departamentos', departamentos, (req, res) => {
    res.render('departamentos', {departamentos: req.departamentos, departamento: req.departamento})
})
// router.post('/login', login)

export default router