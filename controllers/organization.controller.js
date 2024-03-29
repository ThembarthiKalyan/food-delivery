const db = require('../models');
const Organization = db.organizations;
const Op = db.Sequelize.Op;

exports.create = async(organization)=>{
    let data = await Organization.create(organization);
    return data;
}

exports.findOne = async(id)=>{
    let organization = await Organization.findByPk(id);
    return organization;
}