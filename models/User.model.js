const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');
const { ROLES, USER } = require('../const/user.const');
const SALT = +process.env.SALT;

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ROLES,
      default: USER
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

userSchema.pre('save', function(next) {
  if (this.isNew) {
    const genSalt = bcrypt.genSaltSync(SALT);
    const hashPassword = bcrypt.hashSync(this.password, genSalt);
    this.password = hashPassword;
  }
  next(); 
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

const UserModel = model("User", userSchema);

module.exports = UserModel;
