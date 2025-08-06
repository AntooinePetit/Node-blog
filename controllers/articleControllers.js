const Article = require("../models/articleModel");

// Create
exports.createArticle = async (req, res) => {
  const { title, author, content } = req.body;

  const article = new Article({
    title: title,
    author: author,
    content: content,
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Read all
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
    res.json(articles)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
}

// Read one
exports.getOneArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if(article == null) {
      res.status(404).json({message: 'Article non trouvé'})
    }
    res.json(article)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
}

// Update
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if(article == null) {
      res.status(404).json({message: 'Article non trouvé'})
    }

    const {title, author, content} = req.body

    if(title != null){
      article.title = title
    }

    if(author != null){
      article.author = author
    }

    if(content != null){
      article.content = content
    }
    
    const updatedArticle = await article.save()
    res.json(updatedArticle)
    
  } catch(err) {
    res.status(400).json({message: err.message})
  }
}

// Delete
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if(article == null){
      res.status(404).json({message: "Article non trouvé"})
    }

    await article.deleteOne()
    res.json({message: "Article supprimé !"})
  } catch(err) {
    res.status(500).json({message: err.message})
  }
}