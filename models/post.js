// Post Model
module.exports = function (sequelize, DataTypes) {

    //Post Module
    var Post = sequelize.define("Post", {

        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    

    });

    // Associating Post to User Model
    Post.associate = function (models) {

        Post.belongsTo(models.User, { foreignKey: { allowNull: false } });

    };

    return Post;

};