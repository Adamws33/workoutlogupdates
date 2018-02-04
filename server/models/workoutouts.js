module.exports = function(sequelize, DataTypes) {
  //With define, the first argument is going to represent a column in the db table
  
    return sequelize.define('workoutouts', {
      dayout: DataTypes.STRING,
      hourout: DataTypes.INTEGER,
      minout: DataTypes.INTEGER,
    });
  };
  