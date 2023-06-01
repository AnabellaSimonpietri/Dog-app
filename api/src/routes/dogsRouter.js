const { Router } = require("express");
const { Dogs, Temperaments } = require("../db");
const { getAllDogs } = require("../Controllers/ControllerAllDogs");

const dogsRouter = Router();

dogsRouter.get("/", async (req, res) => {
  const name = req.query.name; // Busca nombre por Query
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogsName = await dogsTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    ); // Busqueda mínuscula y mayúscula
    dogsName.length
      ? res.status(200).send(dogsName)
      : res.status(404).send("Sorry, that Dog does not exist"); // Dog no existe
  } else {
    res.status(200).send(dogsTotal); // Todos
  }
});

dogsRouter.get("/:idRaza", async (req, res) => {
  const id = req.params.idRaza;
  const allDogs = await getAllDogs();
  if (id) {
    let dogsID = await allDogs.filter((el) => el.id == id);
    dogsID.length
      ? res.status(200).json(dogsID[0])
      : res.status(404).send("Sorry, that Dog does not exist.");
  }
});

dogsRouter.post("/", async (req, res) => {
  try {
    let { name, life_span, temperament, image, weight, height } = req.body;

    const dogsCreate = await Dogs.create({
      name,
      life_span,
      temperament,
      image: {
        url: image, // Utiliza la URL de la imagen proporcionada por el frontend
      },
      weight,
      height,
    });

    let temperamentsDb = await Temperaments.findAll({
      where: { name: temperament },
    });

    dogsCreate.addTemperaments(temperamentsDb);
    res.json("Successfully created Dog"); //Dog creado con éxito
  } catch (error) {
    console.log(error);
    res.status(404).send("Error creating dog");
  }
});

//Se puede pasar por set pero siento que esta es más optima para mí.

module.exports = dogsRouter;
