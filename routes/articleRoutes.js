const express = require('express')
const router = express.Router()
const articleControllers = require('../controllers/articleControllers')
const authMiddleware = require('../middlewares/authMiddleware')

// Création des routes
router.get('/', articleControllers.getAllArticles)
router.get('/:id', articleControllers.getOneArticle)
router.post('/', authMiddleware, articleControllers.createArticle)
router.put('/:id', authMiddleware, articleControllers.updateArticle)
router.delete('/:id', authMiddleware, articleControllers.deleteArticle)

module.exports = router