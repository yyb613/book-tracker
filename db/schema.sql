DROP DATABASE IF EXISTS mvk1xnkwl127awp5;
CREATE DATABASE mvk1xnkwl127awp5;

USE mvk1xnkwl127awp5;

CREATE TABLE `users` (
    `Id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL ,
    `email` VARCHAR(40) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE `personalLibrary` (
    `userId` INT NOT NULL,
    `bookId` INT NOT NULL
);

CREATE TABLE `AddedBook` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `coverURL` VARCHAR(100)  NOT NULL ,
    `title` VARCHAR(50)  NOT NULL ,
    `author` VARCHAR(50)  NOT NULL ,
    `numPages` VARCHAR(50)  NOT NULL
);

CREATE TABLE `AlreadyRead` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `coverURL` VARCHAR(100)  NOT NULL ,
    `title` VARCHAR(50)  NOT NULL ,
    `author` VARCHAR(50)  NOT NULL ,
    `numPages` VARCHAR(50)  NOT NULL
);

CREATE TABLE `CurrentlyReading` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `coverURL` VARCHAR(100)  NOT NULL ,
    `title` VARCHAR(50)  NOT NULL ,
    `author` VARCHAR(50)  NOT NULL ,
    `numPages` VARCHAR(50)  NOT NULL 
);

CREATE TABLE `WantToRead` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `coverURL` VARCHAR(100)  NOT NULL ,
    `title` VARCHAR(50)  NOT NULL ,
    `author` VARCHAR(50)  NOT NULL ,
    `numPages` VARCHAR(50)  NOT NULL
);