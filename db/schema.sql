CREATE DATABASE second_opinion_db;

USE second_opinion_db;


CREATE TABLE doctors(
	doc_id int(11) NOT NULL AUTO_INCREMENT,
    bestdoc_id varchar(50) NOT NULL,
    first_name varchar(50) NOT NULL,
    mid_name varchar(50) DEFAULT NULL,
    last_name varchar(50) NOT NULL,
    title varchar(10) DEFAULT NULL,
    primary_specialty varchar(150) DEFAULT NULL,
    secondary_specialty varchar(150) DEFAULT NULL,
    practice_rating int(11) DEFAULT 0,
    med_school_rating int(11) DEFAULT 0,
    residency_rating int(11) DEFAULT 0,
    fellowship_rating int(11) DEFAULT 0,
    publications_rating int(11) DEFAULT 0,
    years_exp_rating int(11) DEFAULT 0,
    clinical_trials_rating int(11) DEFAULT 0,
    patient_stars_rating int(11) DEFAULT 0,
    awards_rating int(11) DEFAULT 0,
    total int(11) DEFAULT 0,
    removed BOOLEAN DEFAULT 0,
    primary key(doc_id)
)

CREATE TABLE patients(
    patient_id int(11) NOT NULL AUTO_INCREMENT,
    username varchar(50) NOT NULL,
    firstname varchar(50) NOT NULL,
    lastname varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    current_doctor varchar(50) DEFAULT NULL,
    match_doctor varchar(50) DEFAULT NULL,
    diagnosis varchar(50) DEFAULT NULL,
    last_login DATE,
    isAdmin BOOLEAN DEFAULT 0,
    removed BOOLEAN DEFAULT 0,
    status ENUM ('active', 'inactive') DEFAULT 'active',
    primary key (patient_id)
)


password if you need it: m5J5V77YhJgu
