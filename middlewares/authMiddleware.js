const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({message: "Accès refusé, token manquant !"})
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT)
    req.user = decoded
    next()
  } catch(err) {
    res.status(401).json({message: "Token invalide ou expiré !"})
  }
}

module.exports = authMiddleware