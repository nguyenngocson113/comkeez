module.exports = function(sequelize, DataTypes) {
	return sequelize.define('typeProduct', {
		name			: DataTypes.STRING,
		image		  : DataTypes.STRING,
    description    : DataTypes.STRING,
	})
}
