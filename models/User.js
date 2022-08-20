const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'A User must has a email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'A User must has a password'],
    },
    activated: {
      type: Boolean,
      default: false,
    },
    activationLink: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  });

  // userSchema.pre(/^find/, async function (next) {
  //   this.populate({
  //     path: 'posts',
  //   })
  //   next();
  // });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    this.password = await bcrypt.hash(this.password, 11);
  
    this.email = this.email.toLowerCase();
    next();
  });

  userSchema.methods.createAccountActivationLink = function () {
    const activationToken = crypto.randomBytes(32).toString('hex');
  
    // console.log(activationToken);
  
    this.activationLink = crypto
      .createHash('sha256')
      .update(activationToken)
      .digest('hex');
  
    // console.log({ activationToken }, this.activationLink);
  
    return activationToken;
  };
  userSchema.methods.comparePassword = async (candidatePassword, userPassword) => {
    const result = await bcrypt.compare(candidatePassword, userPassword);
    return result;
  };
  module.exports = mongoose.model('User', userSchema);