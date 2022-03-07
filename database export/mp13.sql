CREATE DATABASE IF NOT EXISTS mp13 ;
USE mp13;

CREATE TABLE IF NOT EXISTS users(
	userId int unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userEmail varchar(120) NOT NULL UNIQUE,
    userPwd char(64) NOT NULL,
    userSalt char(32) NOT NULL,
    userName varchar(255) NOT NULL,
    userLevel int NOT NULL,
    dateCreated date NOT NULL,
    lastAccess date NOT NULL);

CREATE TABLE IF NOT EXISTS products(
	productId int unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    productName varchar(255) NOT NULL,
    categoryId int unsigned NOT NULL,
    productStock int unsigned NOT NULL);
    
CREATE TABLE IF NOT EXISTS categories(
	categoryId int unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    categoryName varchar(64) NOT NULL,	
    categoryDetail varchar(255) NOT NULL);			

ALTER TABLE products
	ADD FOREIGN KEY(categoryId) REFERENCES categories(categoryId)
			ON DELETE CASCADE;