module.exports = function(sequelize, DataTypes) {
    var Patients = sequelize.define("Patients", {
        patient_id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            nontEmpty: true
        },
        lastname: {
            type: DataTypes.STRING,
            nontEmpty: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        current_doctor: {
            type: DataTypes.STRING,
            defaultValue: "None",
            validate: {
                len: [1]
            }
        },
        match_doctor: {
            type: DataTypes.STRING,
            defaultValue: null,
            validate: {
                len: [1]
            }
        },
        diagnosis: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Undisclosed",
            validate: {
                len: [1]
            }
        },
        last_login: {
            type: DataTypes.DATE
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        removed: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active"
        },
    },
        {
            timestamps: false,
            classMethods: {
                associate: function(models) {
                    Patients.belongsTo(models.Doctors, {
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        }
    );
    return Patients;
};