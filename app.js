const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

// Base de données
require("./db");

// Middleware pour parser le JSON
app.use(express.json());

// Intégration des routes
const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require('./routes/userRoutes')

app.use("/api/articles", articleRoutes);
app.use('/api/blog-users', userRoutes)

app.get("/", (req, res) => {
  res.send("Rien à voir ici");
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
