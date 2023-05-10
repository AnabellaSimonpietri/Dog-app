const { Dogs, Temperaments } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

// Esta función trae la info de la api:
const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );

  const apiInfo = await apiUrl.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      life_span: e.life_span,
      temperament: e.temperament,
      image: e.image.url,
      weight: e.weight,
      height: e.height,
    };
  });
  return apiInfo;
};

// Esta función trae la data de la Base de Datos:
const getDbInfo = async () => {
  return await Dogs.findAll({
    // Traeme toda la info
    include: {
      model: Temperaments, // Y traeme los tipos y los nombres
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  // Unifico los Pokemons de mi DB y mi API
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

module.exports = { getAllDogs };
