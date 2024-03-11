const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid')// v4 es la version del ident unico universal(UUID) es aleatoria
//hace que se genere el id de forma aleatoria

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogames', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,// es opcional pero nos da mas control seq generara un UUID unico para el ID
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type:DataTypes.STRING,
      allowNull: false
    },
    released: {
      type:DataTypes.DATEONLY,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, { timestamps: false });
};
