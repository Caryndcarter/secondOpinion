CREATE DATABASE second_opinion_db;  

USE second_opinion_db; 


CREATE TABLE doctors(
	doc_id int(11) NOT NULL AUTO_INCREMENT,
    bestdoc_id int(50) NOT NULL,
    first_name varchar(50) NOT NULL,
    mid_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    primary_specialty varchar(150) NOT NULL,
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
    name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    current_doctor varchar(50) NOT NULL,
    diagnosis varchar(50) NOT NULL,
    removed BOOLEAN DEFAULT 0,
    primary key (patient_id)
)
