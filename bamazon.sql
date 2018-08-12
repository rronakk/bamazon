DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INTEGER(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(20),
  price DECIMAl(10,4),
  stock_quantity INTEGER(10),
  PRIMARY KEY (id)
);

INSERT INTO PRODUCTS (id, product_name, department_name, price, stock_quantity)
VALUES (1, "Nike flat wear", "shoes", 29.99, 10);

INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ( "Apple watch", "watch", 180, 5);

INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("Google pixel 2", "phone", 599, 100);

INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("Levi jeans", "clothes", 59.99, 15);

INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("Samsung Smart 4K TV", "electronics", 500, 6);

INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("Ikea Arm rest chair", "furniture", 59.99, 11);

INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("Coca cola", "drinks", 9.99, 150);

INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("Macbook pro", "computer", 1150, 8);

INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("Everlast notebooks", "stationary", 29.99, 25);

INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES ("Amazon kindle", "e-reader", 59.99, 40);

SELECT * FROM PRODUCTS;

SELECT stock_quantity FROM `products` WHERE id = 1;
UPDATE `products` SET stock_quantity =  stock_quantity + 10 WHERE id = 1;

SELECT * FROM `products` WHERE stock_quantity < 5;