const db = require('../models');
const Item = db.items;
const Op = db.Sequelize.Op;


exports.create = async(item)=>{
    let data = await Item.create(item);
    return data;
};

exports.findOne = async(type)=>{
    let data = await Item.findOne({ where: { type: type } });
    return data.dataValues;

}