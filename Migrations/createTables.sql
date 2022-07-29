CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    type VARCHAR(10) NOT NULL,
    created_on DATETIME DEFAULT NOW()
);

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    sellerId INT NOT NULL,
    created_on DATETIME DEFAULT NOW(),
    FOREIGN KEY(sellerId) REFERENCES users(id)
);

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productId INT NOT NULL,
    buyerId INT NOT NULL,
    sellerId INT NOT NULL,
    created_on DATETIME DEFAULT NOW(),
    FOREIGN KEY(productId) REFERENCES products(id),
    FOREIGN KEY(buyerId) REFERENCES users(id),
    FOREIGN KEY(sellerId) REFERENCES users(id)
);

CREATE TABLE orderProductMapping (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    FOREIGN KEY(productId) REFERENCES products(id),
    FOREIGN KEY(orderId) REFERENCES orders(id)
);
