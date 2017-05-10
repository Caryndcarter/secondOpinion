module.exports = function(sequelize, DataTypes) {
    var Patients = sequelize.define("Patients", {
        name: DataTypes.STRING
    });
    return Patients;
};