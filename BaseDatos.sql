CREATE DATABASE Hotel;
USE Hotel;
Create Table Cliente(
    idCliente int PRIMARY KEY NOT NULL,
    nombre varchar(30) NOT NULL,
    apellido varchar(30) NOT NULL,
    sexo char(1) NOT NULL,
    pais varchar(30) NOT NULL,
    Edad int NOT NULL
);

USE Hotel;
CREATE TABLE Empleado(
    codEmpleado int PRIMARY KEY NOT NULL,
    nombreC varchar(30) NOT NULL,
    direccion varchar(100) NOT NULL,
    cargo char(1) NOT NULL
);

USE Hotel;
CREATE TABLE Paquete(
	idPaquete int PRIMARY KEY NOT NULL,
    tipo varchar(20) NOT NULL,
    precio float NOT NULL,
    fechaInicio date NOT NULL,
    fechaTermino date NOT NULL,
    fechaConfirmacion date NOT NULL,
    vigente date NOT NULL
);

USE Hotel;
CREATE TABLE Reserva(
    idReserva int PRIMARY KEY NOT NULL,
    idCliente int NOT NULL,
    idEmpleado int NOT NULL,
    idPaquete int NOT NULL,
    fecha date NOT NULL,
    cantidad int NOT NULL,
    tipoPago char(1) NOT NULL,
    pago float NOT NULL,
    estado bit NOT NULL,

    FOREIGN KEY (idCliente) REFERENCES cliente (idCliente),
    FOREIGN KEY (idEmpleado) REFERENCES empleado (codempleado),
    FOREIGN KEY (idPaquete) REFERENCES paquete (idPaquete)
);


USE Hotel;
INSERT INTO Cliente (idCliente, nombre, apellido, sexo, pais, Edad)
VALUES
    (1, 'Juan', 'Pérez', 'M', 'Bolivia', 34),
    (2, 'María', 'García', 'F', 'Peru', 45),
    (3, 'Carlos', 'López', 'M', 'Argentina', 23),
    (4, 'Ana', 'Martínez', 'F', 'Venezuela', 32),
    (5, 'Luis', 'Rodríguez', 'M', 'Chile', 54);

USE Hotel;
INSERT INTO Paquete (idPaquete, tipo, precio, fechaInicio, fechaTermino, fechaConfirmacion, vigente)
VALUES
    (1, 'Suite', 1000, '2023-09-01', '2023-09-15', '2023-08-20', '2023-09-15'),
    (2, 'Matrimonial', 1500.75, '2023-10-01', '2023-10-10', '2023-09-10', '2023-10-10'),
    (3, 'Personal', 200.25, '2023-09-15', '2023-09-30', '2023-08-25', '2023-09-30'),
    (4, 'Doble', 300.00, '2023-11-01', '2023-11-10', '2023-10-15', '2023-11-10'),
    (5, 'Romantica', 800.00, '2023-10-15', '2023-10-25', '2023-09-30', '2023-10-25');
    
    select * from Cliente;
        select * from Paquete;
        select * from Empleado;
