const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4, // <-- Genera autmaticamente un ID.
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      hp: {
        type: DataTypes.INTEGER,
      },

      attack: {
        type: DataTypes.INTEGER,
      },

      defense: {
        type: DataTypes.INTEGER,
      },

      speed: {
        type: DataTypes.INTEGER,
      },

      height: {
        type: DataTypes.INTEGER,
      },

      weight: {
        type: DataTypes.INTEGER,
      },

      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      createInDb: {
        // De esta forma verificamos si el pokemon se creo en la base de datos.
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );

  sequelize.define(
    "type",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: "Created",
      updatedAt: "Updated",
    }
  );
};
