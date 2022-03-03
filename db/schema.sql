DROP DATABASE IF EXISTS my_library_db;
CREATE DATABASE my_library_db;

USE DATABASE my_library_db;

CREATE TABLE `Users` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50)  NOT NULL ,
    `password` VARCHAR(50)  NOT NULL ,
);

CREATE TABLE `AddedBook` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(50)  NOT NULL ,
    `author` VARCHAR(50)  NOT NULL ,
    `numPages` VARCHAR(50)  NOT NULL ,
);

CREATE TABLE `AlreadyRead` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(50)  NOT NULL ,
    `author` VARCHAR(50)  NOT NULL ,
    `numPages` VARCHAR(50)  NOT NULL ,
);

CREATE TABLE `CurrentlyReading` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(50)  NOT NULL ,
    `author` VARCHAR(50)  NOT NULL ,
    `numPages` VARCHAR(50)  NOT NULL ,
);

CREATE TABLE `WantToRead` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(50)  NOT NULL ,
    `author` VARCHAR(50)  NOT NULL ,
    `numPages` VARCHAR(50)  NOT NULL ,
);