const express = require("express");
const connectDB = require("./db/db");

const dotenv = require("dotenv").config();
const { setupSwagger } = require("./docs/swagger");

const app = express();
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    app.use("/", require("./routes"));
    console.log(`Swagger http://localhost:${PORT}/api-docs adresinde çalışıyor`);
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
  });
});
