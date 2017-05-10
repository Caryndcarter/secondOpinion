module.exports = function(sequelize, DataTypes) {
    var Doctors = sequelize.define("Authors", {
        name: DataTypes.STRING
    });
    return Doctors;
};