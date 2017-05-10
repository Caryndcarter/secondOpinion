CREATE DATABASE second_opinion_db;  

CREATE TABLE doctors (
	doc_id int(11) NOT NULL AUTO_INCREMENT,
    bestdoc_id int(50) NOT NULL,
    name varchar(50) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(100) NOT NULL,
    current_role varchar (100) NOT NULL,
    current_role_rating int(11) DEFAULT 0,
    current_role_desc varchar(1000) DEFAULT NULL,
    practice varchar (100) NOT NULL,
    practice_rating int(11) NOT NULL,
    practice_location varchar (50) NOT NULL,
    practice_website varchar(100) DEFAULT NULL,
    primary_specialty varchar(150) NOT NULL,
    secondary_specialty varchar(150) DEFAULT NULL,
    undergrad_rating int(11) DEFAULT 0,
    med_school_rating int(11) DEFAULT 0,
    residency_rating int(11) DEFAULT 0,
    fellowship_rating int(11) DEFAULT 0,
    publications_rating int(11) DEFAULT 0,
    years_exp_rating int(11) DEFAULT 0,
    clinical_trials_rating int(11) DEFAULT 0,
    patient_stars_rating int(11) DEFAULT 0,
    awards_rating int(11) DEFAULT 0, 
    medicine_phD BOOLEAN DEFAULT 0, 
    primary key (doc_id)
)


CREATE TABLE doctors_api (
	doc_api_id int(11) NOT NULL AUTO_INCREMENT,
    bestdoc_id int(50) NOT NULL,
    name varchar(50) NOT NULL,
    current_role_rating int(11) DEFAULT 0,
    practice_rating int(11) NOT NULL,
    undergrad_rating int(11) DEFAULT 0,
    med_school_rating int(11) DEFAULT 0,
    residency_rating int(11) DEFAULT 0,
    fellowship_rating int(11) DEFAULT 0,
    publications_rating int(11) DEFAULT 0,
    years_exp_rating int(11) DEFAULT 0,
    clinical_trials_rating int(11) DEFAULT 0,
    patient_stars_rating int(11) DEFAULT 0,
    awards_rating int(11) DEFAULT 0, 
    medicine_phD BOOLEAN DEFAULT 0, 
    primary key(doc_api_id)
)