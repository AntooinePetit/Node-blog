const mongoose = require('mongoose')
const db_uri = process.env.MONGO_URI

mongoose.connect(db_uri)
.then(() => console.log('Connexion réussie à MongoDB'))
.catch(err => console.log(`Erreur de connexion : ${err}`))

module.exports = mongoose.connection