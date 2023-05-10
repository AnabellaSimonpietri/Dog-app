const { Router } = require("express");
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

    let dogsCreated = await Dogs.create({
      name,
      life_span,
      temperament,
      image,
      weight,
      height,
    });

    let temperamentsDb = await Temperaments.findAll({
      where: { name: temperament },
    });

    dogsCreated.addTemperaments(temperamentsDb);
    res.json("Successfully created Dog"); //Dog creado con éxito
  } catch (error) {
    console.error(error);
    res.status(404).send("Error creating dog");
  }
});

//Se puede pasar por set pero siento que esta es más optima para mí.

module.exports = dogsRouter;
