INSERT INTO doctors (
    bestdoc_id,
    first_name,
    mid_name,
    last_name,
    title,
    primary_specialty,
    secondary_specialty,
    practice_rating,
    med_school_rating,
    residency_rating,
    fellowship_rating,
    publications_rating,
    years_exp_rating,
    clinical_trials_rating,
    patient_stars_rating,
    awards_rating,
    total, 
    createdAt,
    updatedAt
) VALUES
(1,"Dr.", "M", "Strange", "neurology", "magic",1,2,3,4,5,6,7,8,9,0,0),
(2,"Jarvis", "computer of", "Iron Man", "prosthetics", "therapeutics",2,3,4,5,6,7,8,9,10,0,0),
(3, "Dr.", "Beverly", "Crusher", "general medicine", "cellular genetics",3,4,5,6,7,8,9,10,11,0,0);

INSERT INTO patients (
    username,
    firstname,
    lastname,
    email,
    password,
    createdAt,
    updatedAt
) VALUES
("starlord", "Peter", "Quill", "pquill@gotg.com", "gotg", 0, 0),
("hulk", "Bruce", "Banner", "bbanner@avengers.com", "gotg", 0, 0),
("ironman", "Tony", "Stark", "tstark@avengers.com", "ironman", 0, 0),
("Drax", "Arthur", "Douglas", "adouglas@gotg.com", "thedestroyer", 0, 0);