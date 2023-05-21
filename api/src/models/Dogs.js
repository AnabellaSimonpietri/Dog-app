const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dogs",
    {
      id: {
        type: DataTypes.UUID, //único.
        allowNull: false, //campo requerido, no puede estar vacío.
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      image: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      temperament: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createBD: {
        //Todo lo que yo cree se crea con esta propiedad, es más eficiente.
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: true }
  );
};
