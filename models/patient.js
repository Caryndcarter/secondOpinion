module.exports = function(sequelize, DataTypes) {
    var Patients = sequelize.define("Patients", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
                isEmail: true
            }
        },
        current_doctor: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "None",
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
        removed: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    },
        {
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