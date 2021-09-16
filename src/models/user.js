const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const phoneSchema = new Schema({
  number: {
    type: String,
    require: true,
  },
  ddd: {
    type: String,
    require: true,
  },
});

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
    select: false,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  phones: [phoneSchema],

  loginAt: {
    type: Date,
    default: Date.now,
    require: true,
  },

}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
