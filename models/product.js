module.exports = function(sequelize, DataTypes) {
	return sequelize.define('product', {
		name			: DataTypes.STRING,
		image		  : DataTypes.STRING,
	  unit_price		  : DataTypes.STRING,
		promotion_price   : DataTypes.STRING,
		id_type    : DataTypes.INTEGER,
    description    : DataTypes.STRING,
    unit    : DataTypes.STRING,
    view    : DataTypes.INTEGER,
		route    : DataTypes.STRING,
	})
}
