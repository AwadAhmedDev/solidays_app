DROP DATABASE IF EXISTS solidays_dev; 

CREATE DATABASE solidays_dev;

CREATE TABLE solidays_dev.role(
    id TINYINT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE solidays_dev.user(
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    role_id TINYINT(1) UNSIGNED NOT NULL,
    FOREIGN KEY (role_id) REFERENCES solidays_dev.role(id),
    INDEX (email)
 );

CREATE TABLE solidays_dev.artist(
    id TINYINT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL UNIQUE,
    image VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    youtubeurl VARCHAR(200) NOT NULL,
    concertday VARCHAR(50) NOT NULL
);
