module.exports = function(sequelize, DataTypes) {
    var Doctors = sequelize.define("Doctors", {
        name: DataTypes.STRING
    });
    return Doctors;
};