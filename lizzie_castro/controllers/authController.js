import cnn from '../database/connection.js'

// ---------------------------------------------- DEPARTAMENTO
export const crearDepartamento = (req, res) => {
    const { departamento, descripcion  } = req.body

    const data = {
        departamento: departamento,
        descripcion: descripcion
    }

    cnn.query('INSERT INTO departamentos SET ?', data, (err, result) => {
        if (err) {
            console.log(`Ocurrio un error al insertar el departamento`)
            return
        }

        res.redirect('/departamentos')
    })
}

export const departamentos = (req, res, next) => {
    // Verificar si lo que quiero es obtener los datos de un departamento en especifico para editar, por metodo POST
    if (req.method == 'POST'){
        const { iddepartamento } = req.body
        
        if (!iddepartamento){
            console.log(`No se envió el iddepartamento`)
            return 
        }
        
        cnn.query('SELECT * FROM departamentos WHERE iddepartamento = ?',[iddepartamento], (err, result) => {
            if (err) {
                console.log(`Ocurrio un error al traer la informacion del departamento a editar ${err}`)
                return
            }
            
            req.departamento = result[0]
        })
    }

    // Si existe busqueda se filtra
    const { q } = req.query ?  req.query : ""

    if (q) {
        // https://www.it-swarm-es.com/es/javascript/node-sentencia-mysql-escape/1041115155/
        // https://es.stackoverflow.com/questions/78237/b%C3%BAsqueda-con-like-que-no-diferencie-may%C3%BAsculas-min%C3%BAsculas-ni-acentos-en-sql-ser
        cnn.query("SELECT * FROM departamentos WHERE departamento COLLATE UTF8_GENERAL_CI LIKE " + cnn.escape('%'+q+'%'),[q], (err, result) => {
            if (err) {
                console.log(`Ocurrio un error al traer la informacion de los departamento ${err}`)
                return
            }
            req.departamentos = result
            req.q = q
            next()
        })
    }
    else {
        cnn.query('SELECT * FROM departamentos', (err, result) => {
            if (err) {
                console.log(`Ocurrio un error al traer la informacion de los departamento`)
                return
            }
            
            req.departamentos = result
            next()
        })
    }

}

export const editarDepartamento = (req, res) => {
    const { departamentoid, departamento, descripcion  } = req.body

    if (!departamentoid || !departamento || !descripcion){
        console.log(`No se proporcionarion todos los datos necesarios para actualizar el departamentO ${err}`)
        return res.redirect('/departamentos')
    } 

    // Construir la data que sera insertada
    const data = {
        departamento: departamento,
        descripcion: descripcion
    }

    cnn.query('UPDATE departamentos SET ? WHERE iddepartamento = ?', [data, departamentoid], (err, result) => {
        if (err) {
            console.log(`Ocurrio un error al actualizar los datos del departamento ${err}`)
            return
        }

        res.redirect('/departamentos')
    })
}

export const eliminarDepartamento = (req, res) => {
    const { iddepartamento  } = req.body

    if (!iddepartamento){
        console.log('IdDepartamento no proporcionado')
        res.redirect('/departamentos')
        return
    } 

    cnn.query('DELETE FROM departamentos WHERE iddepartamento = ?', [iddepartamento], (err, result) => {
        if (err) {
            console.log(`Ocurrio un error al eliminar el departamento ${err}`)
            return
        }

        res.redirect('/departamentos')
    })
}

// --------------------------------------------- EMPLEADO
export const crearEmpleado = (req, res) => {
    const { nombre, departamento, apellido, edad, sueldo  } = req.body

    const data = {
        fkiddepartamento: departamento,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        sueldo: sueldo
    }

    if(!departamento){
        console.log(`No existen departamentos`)
        return res.redirect('/empleados')
    }

    cnn.query('INSERT INTO empleados SET ?', data, (err, result) => {
        if (err) {
            console.log(`Ocurrio un error al insertar el empleado ${err}`)
            return
        }

        res.redirect('/empleados') //redirect porque con render no se hace la consulta de traer los datos puesto que es GET y si hago eso seria POST
    })
}

export const empleados = (req, res, next) => {
    // Si existe busqueda se filtra
    const { q } = req.query ?  req.query : ""

    if (q) {
        // https://www.it-swarm-es.com/es/javascript/node-sentencia-mysql-escape/1041115155/
        // https://es.stackoverflow.com/questions/78237/b%C3%BAsqueda-con-like-que-no-diferencie-may%C3%BAsculas-min%C3%BAsculas-ni-acentos-en-sql-ser
        cnn.query("SELECT idempleado, departamento, nombre, apellido, edad, sueldo, fkiddepartamento FROM empleados e INNER JOIN departamentos d ON e.fkiddepartamento = d.iddepartamento WHERE nombre COLLATE UTF8_GENERAL_CI LIKE " + cnn.escape('%'+q+'%'),[q], (err, result) => {
            if (err) {
                console.log(`Ocurrio un error al traer la informacion de los empleados ${err}`)
                return
            }
            req.empleados = result
            req.q = q
        })
    }
    else {
        cnn.query('SELECT idempleado, departamento, nombre, apellido, edad, sueldo, fkiddepartamento FROM empleados e INNER JOIN departamentos d ON e.fkiddepartamento = d.iddepartamento', (err, result) => {
            if (err) {
                console.log(`Ocurrio un error al traer la informacion de los empleados`)
                return
            }
            
            req.empleados = result
        })
    }
    // Verificar si lo que quiero es obtener los datos de un empleado en especifico para editar, por metodo POST
    if (req.method == 'POST'){
        const { idempleado } = req.body
        
        if (!idempleado){
            console.log(`No se envió el idempleado`)
            return 
        }

        cnn.query('SELECT * FROM empleados WHERE idempleado = ?',[idempleado], (err, result) => {
            if (err) {
                console.log(`Ocurrio un error al traer la informacion del empleado a editar`)
                return
            }
            
            req.empleado = result[0]
        })
    }

    cnn.query('SELECT iddepartamento, departamento FROM departamentos', (err, result) => {
        if (err) {
            console.log(`Ocurrio un error al traer la informacion de los departamentos`)
            return
        }
        
        req.departamentos = result
        next()
    })

}

export const editarEmpleado = (req, res) => {
    const { empleadoid, departamento, nombre, apellido, edad, sueldo  } = req.body

    if (!empleadoid || !nombre || !apellido || !edad || !sueldo){
        console.log('No se enviaron todos los datos solicitados para editar el empleado')
        return res.redirect('/empleados')
    } 

    const data = {
        fkiddepartamento: departamento,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        sueldo: sueldo
    }

    cnn.query('UPDATE empleados SET ? WHERE idempleado = ?', [data, empleadoid], (err, result) => {
        if (err) {
            console.log(`Ocurrio un error al actualizar los datos del empleado ${err}`)
            return
        }

        res.redirect('/empleados')
    })
}

export const eliminarEmpleado = (req, res) => {
    const { idempleado } = req.body

    cnn.query('DELETE FROM empleados WHERE idempleado = ?', [idempleado], (err, result) => {
        if (err) {
                console.log(`Ocurrio un error al eliminar al empleado ${err}`)
                return
            }
        
        res.redirect('/empleados')
    })
}
