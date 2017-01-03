module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bill', {
		email 		: DataTypes.STRING,
		name			: DataTypes.STRING,
		address		  : DataTypes.STRING,
		total    : DataTypes.INTEGER,
	})
}
