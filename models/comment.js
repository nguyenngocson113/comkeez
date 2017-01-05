module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comment', {
		idPost 			: DataTypes.INTEGER,
		userId			: DataTypes.INTEGER,
		content		  : DataTypes.STRING,
	})
}
