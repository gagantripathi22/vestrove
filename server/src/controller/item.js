const Item = require("../models/item");

const addItem = async (req, res) => {
  const data = new Item({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json(error);
  }
};

const removeItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const itemToRemove = await Item.findByIdAndDelete({ _id: itemId });
    res.status(200).json(itemToRemove);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllMaleItem = async (req, res) => {
  try {
    const maleItem = await Item.find({}).where("category").equals("male");
    res.status(200).json(maleItem);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllFemaleItem = async (req, res) => {
  try {
    const femaleItem = await Item.find({}).where("category").equals("female");
    res.status(200).json(femaleItem);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAll = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateItem = async (req, res) => {
  const filter = { _id: req.params.id };
  const toUpdate = req.body;
  console.log(filter, toUpdate);
  try {
    const itemToUpdate = await Item.findOneAndUpdate(filter, toUpdate);
    res.status(200).json(itemToUpdate);
  } catch (error) {
    res.status(200).json(error);
  }
};

const additemController = {
  addItem: addItem,
  removeItem: removeItem,
  getAllMaleItem: getAllMaleItem,
  getAllFemaleItem: getAllFemaleItem,
  getAll: getAll,
  updateItem: updateItem,
};

module.exports = additemController;
