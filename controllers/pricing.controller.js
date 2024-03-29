const db = require('../models');
const Pricing = db.pricings;
const Op = db.Sequelize.Op;

exports.create = async(pricing)=>{
    let data = await Pricing.create(pricing);
    return data;
}

exports.findAll = async()=>{
    let pricing = await Pricing.findAll();
    return pricing;
}

exports.findOne = async(organization_id, item_id)=>{
    let pricing = await Pricing.findOne({where: {
        [Op.and]:{organization_id: organization_id, item_id: item_id}}});
    return pricing;
}