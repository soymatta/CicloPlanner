-- Crear la base de datos 'cicloplanner' si aún no existe
CREATE DATABASE IF NOT EXISTS cicloplanner;

-- Usar la base de datos 'cicloplanner'
USE cicloplanner;

-- Crear la tabla 'alarms' antes de 'neighborhoods' para evitar conflictos
CREATE TABLE IF NOT EXISTS alarms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    neighborhood_id INT
);

-- Crear la tabla 'neighborhoods' antes de 'routes' para evitar conflictos
CREATE TABLE IF NOT EXISTS neighborhoods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    coords VARCHAR(255),
    alarm_id INT,
    FOREIGN KEY (alarm_id) REFERENCES alarms(id)
);

-- Crear la tabla 'users' antes de 'comments' y 'routes' para evitar conflictos
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30),
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    image VARCHAR(300) NOT NULL,
    address VARCHAR(300)
);

-- Crear la tabla 'comments' después de 'users'
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255),
    date DATE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Crear la tabla 'routes' después de 'users' y 'neighborhoods'
CREATE TABLE IF NOT EXISTS routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    distance VARCHAR(255) NOT NULL,
    aprox_time TIME NOT NULL,
    start VARCHAR(255) NOT NULL,
    destiny VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    favorite BOOLEAN NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
