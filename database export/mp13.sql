CREATE DATABASE IF NOT EXISTS mp13 ;
USE mp13;

CREATE TABLE IF NOT EXISTS users(
	userId int unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userEmail varchar(120) NOT NULL UNIQUE,
    userPwd char(64) NOT NULL,
    userSalt char(32) NOT NULL,
    userName varchar(255) NOT NULL,
    userLevel int NOT NULL);

CREATE TABLE IF NOT EXISTS products(
	productId int unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    productName varchar(255) NOT NULL,
    categoryId int unsigned NOT NULL,
    productStock int unsigned NOT NULL);
    
CREATE TABLE IF NOT EXISTS categories(
	categoryId int unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    categoryName varchar(64) NOT NULL,	
    categoryDetail varchar(255) NOT NULL);
    
CREATE TABLE IF NOT EXISTS sessionsusers(
	sessionid CHAR(64) PRIMARY KEY NOT NULL
);

ALTER TABLE products
	ADD FOREIGN KEY(categoryId) REFERENCES categories(categoryId)
			ON DELETE CASCADE;
    
INSERT INTO categories 
VALUES
	(NULL, "No Category", "Empty Category"),
	(NULL, "Furniture", "Perabotan rumah tangga dan furniture"),
    (NULL, "Food", "Makanan dan Minuman"),
    (NULL, "Building", "Material Bangunan");
    
INSERT INTO products 
VALUES
	(NULL, "Meja Makan", 2, 10),
	(NULL, "Meja Minum", 2, 20),
	(NULL, "Meja Saja", 2, 2),
    (NULL, "Sambal Pak Udin", 3, 1),
    (NULL, "Saos Bu Ayu", 3, 2),
    (NULL, "Bata Hijau", 4, 0);

/*pass = admin123*/
INSERT INTO users
VALUES
	(NULL, "admin@admin.com", "75cc147ca175c351d37b62224e179d5f13cd8c8709557425a938fdb24aa67231", "41R4rsTyEvjRxYar3Trm8PSiRr21hqnm", "Admin Database Udin", 1);