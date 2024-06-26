const express = require("express");
const app = express();
const vidroRoutes = require("./routes/vidroRoutes");
const mongoose = require("mongoose");

// Conectando ao MongoDB
mongoose
  .connect(
    "mongodb+srv://eu:SENHA@cluster0.t4wiie6.mongodb.net/reciclagem?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conectado ao MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB Atlas:", error);
  });

const PORT = process.env.PORT || 3004;

app.use(require("cors")());

// Middleware
app.use(express.json());
app.use("/", vidroRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
