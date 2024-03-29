const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = '3000';
const db = require("./models");
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const items = require('./controllers/item.controller');
const organizations = require('./controllers/organization.controller');
const pricings = require('./controllers/pricing.controller');

// Route to get total price
app.get('/price', async (req, res) => {
  try {
    let body = req.body;
    if (!body.zone || !body.organization_id) {
      return res.status(400).send({ message: "Give all required fields" })
    }

    let itemObj = await items.findOne(body.item_type);
    let itemId = itemObj.id;
    let organization = await organizations.findOne(body.organization_id);
    if(organization === null){
      return res.status(400).send({ message: "Delivary not available at selected organization" })
    }
    let pricing = await pricings.findOne(body.organization_id, itemId);
    if(pricing === null){
      return res.status(400).send({ message: "Delivary not available at selected organization with item type" })
    }
    let priceObj =  pricing.dataValues;

    let totalPrice = 0
    let remainingDistance = body.total_distance - priceObj.base_distance_in_km;
    totalPrice += priceObj.fix_price;
    if (remainingDistance > 0) {
      let remainingPrice = remainingDistance * priceObj.km_price;
      totalPrice += remainingPrice;
    }
    res.send({ total_price: totalPrice });

  } catch (e) {
    res.send({ message: e.message })
  }
});

//Route to create item in database
app.post('/create-item', async (req, res) => {
  try {
    if (!req.body.type) {
      return res.status(400).send({ message: 'Content cannot be empty' })
    }
    const item = {
      type: req.body.type,
      description: req.body.description
    };
    let data = await items.create(item)
    res.send(data);
  } catch (e) {
    res.send({ message: e.message })
  }
})

//Route to create organizations in database
app.post('/create-organization', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Content cannot be empty' })
    }
    const organization = {
      name: req.body.name
    };
    let data = await organizations.create(organization);
    res.send(data);
  } catch (e) {
    res.send({ message: e.message })
  }
})
//Route to create pricing in database
app.post('/create-pricing', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: 'Content cannot be empty' })
    }
    const pricing = {
      organization_id: req.body.organization_id,
      item_id: req.body.item_id,
      zone: req.body.zone,
      base_distance_in_km: req.body.base_distance_in_km,
      km_price: req.body.km_price,
      fix_price: req.body.fix_price
    };
    let data = await pricings.create(pricing);
    res.send(data);
  } catch (e) {
    res.send({ message: e.message })
  }
})

app.listen(port, () => { console.log(`App listening to port ${port}`) })