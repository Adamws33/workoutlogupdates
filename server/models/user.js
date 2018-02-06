module.exports = function(sequelize, DataTypes){  
  return sequelize.define('user',{
    username:{
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
    passwordhash: {
			type: DataTypes.STRING,
			validate:{
				min:5
			}
    }
  }
  )};
