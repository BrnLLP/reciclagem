const express = require('express');
const mongoose = require("mongoose");
const Plastico = require('../models/plastico');
const { ObjectId } = mongoose.Types;
const router = express.Router();

app.post('/plasticos', async (req, res) => {
  try {
    const papel = new Papel(req.body);
    await papel.save();
    res.status(201).json(papel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/plasticos", async (req, res) => {
  try {
    const plasticos = await Plastico.find();
    res.status(200).json(plasticos);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/plasticos/:id", async (req, res) => {
  try {
    const Plastico = await Plastico.findOne({ code: req.params.code });
    res.status(200).json(Plastico);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete("/plasticos/:id", (req, res, next) => {
  const id = req.params.id;
  Plastico.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.patch("/plasticos/:id", (req, res, next) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    Plastico.updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "Não foi possível atualizar o documento" });
      });
  } else {
    res.status(500).json({ error: "Id inválido" });
  }
});


module.exports = router;