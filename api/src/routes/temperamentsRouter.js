const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const { Temperaments } = require("../db");
const temperamentsRouter = Router();

temperamentsRouter.get("/", async (req, res) => {
  try {
    const temperamentsInfo = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    const temperamentsBd = temperamentsInfo.data
      .map((breed) => breed.temperament) // extraer la cadena de temperamentos de cada raza
      .filter((temperamentStr) => !!temperamentStr) // filtrar los temperamentos nulos o vacíos
      .flatMap((temperamentStr) => temperamentStr.split(/\s*,\s*/)) // dividir la cadena de temperamentos en una lista
      .map((name) => ({ name })); // crear una lista de objetos Temperaments con el nombre de cada temperamento

    for (const temperament of temperamentsBd) {
      await Temperaments.findOrCreate({
        where: { name: temperament.name },
      });
    }

    const todosTemperaments = await Temperaments.findAll();

    res.json(todosTemperaments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error server" });
  }
});

module.exports = temperamentsRouter;
