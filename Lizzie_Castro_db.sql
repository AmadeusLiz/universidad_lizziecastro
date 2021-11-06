-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2021 a las 07:07:24
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Lizzie_Castro_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--
CREATE DATABASE Lizzie_Castro_db

CREATE TABLE `Lizzie_Castro_db`.`departamentos` (
  `iddepartamento` int(11) NOT NULL,
  `departamento` varchar(70) COLLATE utf8_bin NOT NULL,
  `descripcion` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `Lizzie_Castro_db`.`departamentos` (`iddepartamento`, `departamento`, `descripcion`) VALUES
(1, 'IT', 'Departamento de tecnología e información'),
(2, 'Finanzas', 'Departamento de contabilidad'),
(3, 'Recursos Humanos', 'Departamento de recursos humanos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `Lizzie_Castro_db`.`empleados` (
  `idempleado` int(11) NOT NULL,
  `fkiddepartamento` int(11) DEFAULT NULL,
  `nombre` varchar(70) COLLATE utf8_bin NOT NULL,
  `apellido` varchar(70) COLLATE utf8_bin DEFAULT NULL,
  `edad` int(11) NOT NULL,
  `sueldo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `Lizzie_Castro_db`.`empleados` (`idempleado`, `fkiddepartamento`, `nombre`, `apellido`, `edad`, `sueldo`) VALUES
(1, 1, 'Karla', 'Lainez', 30, 13400.2),
(2, 1, 'Andrea', 'Benitez', 22, 12000.5),
(3, 2, 'Pedro', 'Perez', 28, 12434.1),
(4, 2, 'Juan', 'Mejia', 21, 12800.3),
(5, 3, 'Alejandra', 'Gudi', 21, 2321310),
(6, 3, 'Dacia', 'Bertrand', 21, 2323120),
(7, 1, 'Melva', 'Romero', 21, 32321.6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `Lizzie_Castro_db`.`departamentos`
  ADD PRIMARY KEY (`iddepartamento`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `Lizzie_Castro_db`.`empleados`
  ADD PRIMARY KEY (`idempleado`),
  ADD KEY `empleados_ibfk_1` (`fkiddepartamento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `Lizzie_Castro_db`.`departamentos`
  MODIFY `iddepartamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `Lizzie_Castro_db`.`empleados`
  MODIFY `idempleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `Lizzie_Castro_db`.`empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`fkiddepartamento`) REFERENCES `departamentos` (`iddepartamento`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
