module.exports = function(sequelize, DataTypes) {
    var Doctors = sequelize.define("Doctors", {
        doc_id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        bestdoc_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        mid_name: {
            type: DataTypes.STRING,
            defaultValue: "None"
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: "None"
       },
        primary_specialty: {
            type: DataTypes.STRING,
            defaultValue: "None"
        },
        secondary_specialty: {
            type: DataTypes.STRING,
            defaultValue: "None"
        },
        practice_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        med_school_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        residency_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        fellowship_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        publications_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        years_exp_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        clinical_trials_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        patient_stars_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        awards_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        total: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        removed: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
    },
        {   
            timestamps: false,
            classMethods: {
                associate: function(models) {
                    Doctors.hasMany(models.Patients, {});
                }
            }
        }
    );
    return Doctors;
};