-- use flask_app;

-- CREATE TABLE Doctor(
-- 	doctor_id INT AUTO_INCREMENT NOT NULL,
-- 	doctor_name VARCHAR(50) NOT NULL UNIQUE,
-- 	PRIMARY KEY(patient_id)
-- );

CREATE TABLE Patient (
    patient_id 				INT 			AUTO_INCREMENT,
	pacemaker_dependent 	INT 			NOT NULL, 
	incision_location 		VARCHAR(12) 	NOT NULL,
	image_path 				VARCHAR(100) 	NOT NULL,
	PRIMARY KEY(patient_id)
);

-- CREATE TABLE Pacemaker (
--     pacemaker_id INT AUTO_INCREMENT NOT NULL,
--     pacemaker_name VARCHAR(50) NOT NULL UNIQUE,
-- 	pacemaker_manufacturer VARCHAR(50) NOT NULL,
-- 	current_batteryvoltage INT NOT NULL,
-- 	CONSTRAINT associated_patient_id
-- 		FOREIGN KEY(default_patient_id)
-- 		REFERENCES Patient(patient_id),
-- 	lastFullEnergyChargeTime INT NOT NULL,
-- 	leads INT NOT NULL,
-- 	impedance INT NOT NULL,
-- 	sensing INT NOT NULL,
-- 	threshold INT NOT NULL,
-- 	timePacedSensedPercent INT NOT NULL,
-- 	underlyingRhythm INT NOT NULL,
-- 	ModeSwitchEpisodes INT NOT NULL,
-- 	sesnsingThreadholdSettings INT NOT NULL,
-- 	pacingOutput INT NOT NULL,
-- 	PRIMARY KEY(pacemaker_id)
-- );


-- EXAMPLES REMOVE THESE LATER
-- CREATE TABLE Account (
-- 	account_id INT AUTO_INCREMENT NOT NULL,
-- 	customer_id INT,
-- 	account_name VARCHAR(50) NOT NULL,
-- 	balance FLOAT(10,2),
-- 	account_type VARCHAR(100) NOT NULL,
-- 	PRIMARY KEY(account_id)
-- 	-- CONSTRAINT FK_CustomerAccount FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
-- );

-- INSERT INTO Customer VALUES(DEFAULT, 'charles', 'weng');
-- INSERT INTO Account VALUES(DEFAULT, 1, 'checkings', 1000, 'checkings');

-- Example population for table
INSERT INTO Patient VALUES(DEFAULT, '0', 'Below', '/User/Bingus/image1');