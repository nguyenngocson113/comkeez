module.exports = function(sequelize, DataTypes) {
	return sequelize.define('detailBill', {
		idBill 		: DataTypes.INTEGER,
		idProduct			: DataTypes.INTEGER,
		quality		  : DataTypes.STRING,
		price    : DataTypes.INTEGER,
	})
}
