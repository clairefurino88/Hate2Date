// Requiring bcrypt for password hashing\security. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");

// User Model
module.exports = function (sequelize, DataTypes) {

  // User Definition
  var User = sequelize.define("User", {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    relationshipType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    imageUrl: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }); // End of User Definition

  // Associating User with Post Model
  User.associate = function (models) {

    User.hasMany(models.Post, { onDelete: "CASCADE" });

  };

  // User Model Password Validation
  User.prototype.validPassword = function (password) {

    return bcrypt.compareSync(password, this.password);

  };

  // Hooks method automatically runs during various phases of the User Model lifecycle.
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function (user) {

    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);

  });

  return User;

}; // End User Model
