
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        view: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.STRING(30),
            defaultValue: 0
        },
        updatedAt: {
            type: DataTypes.STRING(30),
            defaultValue: 0
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        timestamps: false,
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
    };
    return Post;
};
