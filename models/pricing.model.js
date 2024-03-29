// const { sequelize, Sequelize } = require(".");
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Pricing = sequelize.define('pricing', {
        organization_id: {
            type: DataTypes.INTEGER,
        },
        item_id: {
            type: DataTypes.INTEGER,
        },
        zone: {
            type: DataTypes.STRING,
        },
        base_distance_in_km: {
            type: DataTypes.INTEGER,
        },
        km_price: {
            type: DataTypes.FLOAT
        },
        fix_price: {
            type: DataTypes.INTEGER
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

    return Pricing;
}