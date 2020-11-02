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
    }, {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
    });
    // User.associate = (db) => {
    //     db.User.hasMany(db.Post);
    //     db.User.hasMany(db.Comment);
    // };
    return User;
};
