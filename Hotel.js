const express = require ("express");
const mysql=require (`mysql2`);
const app = express ();
const conexion = mysql.createConnection ({

    host:'localhost',
    user: 'root',
    password: '9194756',
    database: 'hotel'
});

conexion.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión exitosa a la base de datos');
});

app.use(express.json());
app.get('/dumbo', (req, res) => {
    const sql = 'SELECT * FROM Cliente';

    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        } else {
            res.json(result);
        }
    });
});
app.post('/dumbo', (req, res) => {
    let latestId;
    let getLatestIdSql = "SELECT MAX(idCliente) as latestId FROM Cliente";

    conexion.query(getLatestIdSql, (err, rows) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            if (rows[0].latestId === null) {
                latestId = 1;
            } else {
                latestId = rows[0].latestId + 1;
            }
            const data = {
                idCliente: latestId,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                sexo: req.body.sexo,
                pais: req.body.pais,
                Edad: req.body.Edad
            };

            let insertSql = "INSERT INTO Cliente SET ?";
            
            conexion.query(insertSql, data, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ mensaje: 'Error inesperado' });
                } else {
                    res.json(result);
                }
            });
        }
    });
    app.get("/paquetes", (req, res) => {
        const sql = "SELECT * FROM Paquete";
    
        conexion.query(sql, (err, result) => {
            if (err) {
                console.log(err.message);
                res.status(500).json({ mensaje: "Error en el servidor" });
            } else {
                res.json(result);
            }
        });
    });
    app.post("/paquetes", (req, res) => {
        let latestId;
        let getLatestIdSql = "SELECT MAX(idPaquete) as latestId FROM Paquete";
    
        conexion.query(getLatestIdSql, (err, rows) => {
            if (err) {
                console.log(err.message);
                res.json({ mensaje: "Error inesperado" });
            } else {
                if (rows[0].latestId === null) {
                    latestId = 1;
                } else {
                    latestId = rows[0].latestId + 1;
                }
                const data = {
                    idPaquete: latestId,
                    tipo: req.body.tipo,
                    precio: req.body.precio,
                    fechaInicio: req.body.fechaInicio,
                    fechaTermino: req.body.fechaTermino,
                    fechaConfirmacion: req.body.fechaConfirmacion,
                    vigente: req.body.vigente
                };
    
                let insertSql = "INSERT INTO Paquete SET ?";
                
                conexion.query(insertSql, data, (err, result) => {
                    if (err) {
                        console.log(err.message);
                        res.json({ mensaje: "Error inesperado" });
                    } else {
                        res.json(result);
                    }
                });
            }
        });
    });
});    
app.post('/prod/:idCliente/:idEmpleado/:idPaquete', (req, res) => {

    data = {
        idReserva: 0,
        idCliente: req.params.idCliente,
        idEmpleado: req.params.idEmpleado,
        idPaquete: req.params.idPaquete,
        fecha: req.body.fecha,
        cantidad: req.body.cantidad,
        tipoPago: req.body.tipoPago,
        pago: req.body.pago,
        estado: req.body.estado
    };

    generaNuevoId((err, newId) => {
        if (err) {
            res.json({ mensaje: 'Error inesperado' });
        } else {
            data.idReserva = newId;

            let sql = "INSERT INTO Reserva SET ?";
            conexion.query(sql, data, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ mensaje: 'Error inesperado' });
                } else {
                    res.json(result);
                }
            });
        }
    });
});

function generaNuevoId(callback) {
    let getLastIdQuery = "SELECT MAX(idReserva) AS lastId FROM Reserva";
    conexion.query(getLastIdQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            callback(err, null);
        } else {
            let lastId = result[0].lastId || 0;
            let newId = lastId + 1;
            callback(null, newId);
        }
    });
}

app.get('/prod', (req, res) => {
    let sql = 'SELECT * FROM Reserva';
    conexion.query(sql, (err,  resul) => {
        if(err){
            console.log(err.message);
            res.json({mensaje: 'Error indesperado'})
        }else{
            res.json(resul);
        }
    });
});

app.post('/prod', (req, res) => {

    data = {
        codEmpleado: 0,
        nombreC: req.body.nombreC,
        direccion: req.body.direccion,
        cargo: req.body.cargo
    };

    generaNuevoId((err, newId) => {
        if (err) {
            res.json({ mensaje: 'Error inesperado' });
        } else {
            data.codEmpleado = newId;

            let sql = "INSERT INTO Empleado SET ?";
            conexion.query(sql, data, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ mensaje: 'Error inesperado' });
                } else {
                    res.json(result);
                }
            });
        }
    });
});

function generaNuevoId(callback) {
    let getLastIdQuery = "SELECT MAX(codEmpleado) AS lastId FROM Empleado";
    conexion.query(getLastIdQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            callback(err, null);
        } else {
            let lastId = result[0].lastId || 0;
            let newId = lastId + 1;
            callback(null, newId);
        }
    });
}

app.get('/prod', (req, res) => {
    let sql = 'SELECT * FROM Empleado';
    conexion.query(sql, (err,  resul) => {
        if(err){
            console.log(err.message);
            res.json({mensaje: 'Error indesperado'})
        }else{
            res.json(resul);
        }
    });
});

app.listen(5000, () => {
    console.log('Servidor iniciado en el puerto 5000');
});

