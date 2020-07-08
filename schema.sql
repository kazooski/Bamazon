-- Creating database
CREATE DATABASE bamazon;

USE bamazon;

--creating table
CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    product_sales DECIMAL(10,2) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * from products;

INSERT INTO products (product_name, product_sales, department_name, price, stock_quantity)
VALUES 
    ("Logitech Camera 1080p", 0, "Computer Accessories", 30.00, 100),
    ("Yeti Microphone", 0, "Computer Accessories", 99.99, 100),
    ("Blue Baby Bottle SL", 0, "Audio Gear", 399.99, 100),
    ("Bucket Hat", 0, "Hats", 75.00, 25),
    ("Fruits Basket Vol. 1", 0, "Books", 7.99, 45),
    ("Fruits Basket Vol. 2", 0, "Book", 7.99, 50),
    ("Ultimate Ears Boom 3 Speaker", 0, "Audio Gear", 49.99, 50),
    ("Desk Lamp", 0, "Lighting", 20.00, 20),
    ("20 5B Pencil Set", 0, "Stationary", 4.00, 10),
    ("Hand Sanitizer 20 oz", 0, "Bath", 79.99, 0);
);