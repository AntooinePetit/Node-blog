const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, `Le nom d'utilisateur est requis`],
    unique: [true, `Ce nom d'utilisateur est déjà pris`],
    trim: true,
    minlength: [3, `Le nom d'utilisateur doit faire au moins 3 caractères`],
    maxlength: [30, `Le nom d'utilisateur doit faire au maximum 30 caractères`],
    match: [
      /^[a-zA-Z0-9_]+$/,
      "Le nom d'utilisateur ne peut contenir que des chiffres, des lettres et underscores",
    ],
  },
  email: {
    type: String,
    require: [true, `L'email est requis`],
    unique: [true, `Cette adresse email est déjà prise`],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/],
  },
  password: {
    type: String,
    require: [true, `Le mot de passe est requis`],
    minlength: [6, `Le mot de passe doit faire au moins 6 caractères`],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index pour les performances
// userSchema.index({ email: 1});
// userSchema.index({ username: 1});

// Middleware pour hacher le mot de passe
userSchema.pre('save', async function(next) {
  this.updatedAt = Date.now()

  if(!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(parseInt(12))
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch(err) {
    next(err)
  }
})

module.exports = mongoose.model('User', userSchema)