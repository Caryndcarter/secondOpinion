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
    name,
    email,
    current_doctor,
    match_doctor,
    diagnosis,
    createdAt,
    updatedAt
) VALUES
("Jeff", "jeff@gmail.com", "Dr. Seymour Hopkins", "Dr. Strange Duck","Lung Cancer", 0, 0),
("Luke", "luke@gmail.com", "Dr. Strange", "Dr. Love", "Pigmentation Discoloration", 0, 0),
("Anakin", "anakin@gmail.com", "Lord Sidious", "Dr. Jar Jar", "High Midichlorian", 0, 0);