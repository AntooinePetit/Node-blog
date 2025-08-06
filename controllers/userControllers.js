const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email }, { username });

    if (user)
      res.status(200).json({
        message: `Vous ne pouvez pas vous inscrire avec ce nom d'utilisateur ou cet email`,
      });

    const newUser = new User({ username, email, password });
    await newUser.save();

    // Connexion de l'utilisateur
    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
      },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Utilisateur connecté avec succès",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.findOne({email})

    if(!user) return res.status(401).json({message: "Identifiants invalides"})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(401).json({message: "Identifiants invalides"})

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username
      },
      process.env.JWT,
      {expiresIn: "1h"}
    )
    res.json({token})
  } catch(err) {
    res.status(500).json({message: err.message})
  }
 
}