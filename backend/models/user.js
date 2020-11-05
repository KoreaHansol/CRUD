module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userid: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, // 필수
    },
  });
  User.associate = function (db) {
    db.User.hasMany(db.Post)
    db.User.hasMany(db.Comment);
  };
  return User;
};