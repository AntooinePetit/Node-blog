const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Le titre est requis'],
    minlength: [3, 'Le titre doit faire au moins 3 caractères']
  },
  author: {
    type: String,
    require: [true, `L'auteur est requis`],
    minlength: [4, `L'auteur doit faire au moins 4 caractères`]
  },
  content: {
    type: String,
    require: [true, `Le contenu de l'article est requis`],
    minlength: [10, `Le contenu de l'article doit faire au moins 10 caractères`]
  },
  publicationDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Article', articleSchema)