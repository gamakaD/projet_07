const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const path = require("path");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const adminRoutes = require("./routes/admin");

const app = express();

mongoose
  .connect("mongodb://localhost/Groupomania", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb connection successful !"))
  .catch(() => console.log("Mongodb failed connection !"));

app.use(cors());
app.use(express.json());

// Helmet pour la gestion des Headers
app.use(helmet({
  contentSecurityPolicy: {
      directives: {
          imgSrc: ["'self'"],
      },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
}
))

// express-rate-limit pour empecher les attaques de Brute Force
const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
max: 100, // Limiter chaque IP à 100 requetes par `window` (ici, pour 15 minutes)
standardHeaders: true, // Retourner les infos rate limit dans le headers `RateLimit-*`
legacyHeaders: false, // Desactiver le headers `X-RateLimit-*`
})

app.use(limiter)

// Servir le dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
