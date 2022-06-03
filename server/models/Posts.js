// Defining schema

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Posts;
};
