-- use flask_app;

CREATE TABLE Customer (
    customer_id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
	PRIMARY KEY(customer_id)
);

CREATE TABLE Account (
	account_id INT AUTO_INCREMENT NOT NULL,
	customer_id INT,
	account_name VARCHAR(50) NOT NULL,
	balance FLOAT(10,2),
	account_type VARCHAR(100) NOT NULL,
	PRIMARY KEY(account_id)
	-- CONSTRAINT FK_CustomerAccount FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);

INSERT INTO Customer VALUES(DEFAULT, 'charles', 'weng');
-- INSERT INTO Account VALUES(DEFAULT, 1, 'checkings', 1000, 'checkings');