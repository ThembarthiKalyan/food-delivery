// const { sequelize, Sequelize } = require(".");
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Organization = sequelize.define('organization', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }

    })

    return Organization;
}