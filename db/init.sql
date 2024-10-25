-- use flask_app;

-- CREATE TABLE Doctor(
-- 	doctor_id INT AUTO_INCREMENT NOT NULL,
-- 	doctor_name VARCHAR(50) NOT NULL UNIQUE,
-- 	PRIMARY KEY(patient_id)
-- );

CREATE TABLE Patient (
    patient_id INT AUTO_INCREMENT,
    pacemaker_dependent INT NOT NULL,
    incision_location VARCHAR(12) NOT NULL,
    pacemaker_manufacturer VARCHAR(50),
    magnet_response VARCHAR(20),
    impedance INT NOT NULL,
    image_path VARCHAR(13383),
    PRIMARY KEY (patient_id)
);


-- Example population for table
INSERT INTO Patient VALUES(DEFAULT, '0', 'Below', 'ST JUDE', 'EGM', '34', "bingus");