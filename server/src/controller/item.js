const Item = require("../models/item");
const { db, firebaseConfig } = require("../config/firebase");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

initializeApp(firebaseConfig);

const storage = getStorage();

const uploadImage = async (req, res, next) => {
  const storageRef = ref(storage, `files/${req.file.originalname}`);
  const metadata = {
    contentType: req.file.mimetype,
  };
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );
  const setReqImageUrl = async (imageUrl) => {
    req.body.image = imageUrl;
  };
  const downloadURL = await getDownloadURL(snapshot.ref).then(async (data) => {
    console.log(data);
    await setReqImageUrl(data);
    next();
  });
  console.log("File successfully uploaded.");
};

const addItem = async (req, res) => {
  console.log("Add Item Called");
  const data = new Item({
    name: req.body.name,
    price: req.body.price,
    gender: req.body.gender,
    category: req.body.category,
    image: req.body.image,
    addedAt: new Date(),
    size: req.body.size,
    color: req.body.color,
  });
  try {
    const dataToSave = await data.save().then(() => {});
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
    let query = {};
    if (req.query.type) {
      query.category = req.query.type;
    }
    if (req.query.color) {
      query.color = req.query.color;
    }
    if (req.query.size) {
      query.size = req.query.size;
    }
    const maleItem = await Item.find(query).where("gender").equals("men");
    res.status(200).json(maleItem);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllFemaleItem = async (req, res) => {
  try {
    const femaleItem = await Item.find({}).where("gender").equals("women");
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

const getMaleItemByCategory = async (req, res) => {
  const category = { _id: req.params.category };

  try {
    const maleItem = await Item.find({})
      .where("gender")
      .equals("men")
      .where("category")
      .equals(category);
    res.status(200).json(maleItem);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getWomenItemByCategory = async (req, res) => {
  const category = { _id: req.params.category };

  try {
    const maleItem = await Item.find({})
      .where("gender")
      .equals("women")
      .where("category")
      .equals(category);
    res.status(200).json(maleItem);
  } catch (error) {
    res.status(400).json(error);
  }
};

const additemController = {
  addItem: addItem,
  removeItem: removeItem,
  getAllMaleItem: getAllMaleItem,
  getAllFemaleItem: getAllFemaleItem,
  getAll: getAll,
  updateItem: updateItem,
  uploadImage: uploadImage,
  getMaleItemByCategory: getMaleItemByCategory,
  getWomenItemByCategory: getWomenItemByCategory,
};

module.exports = additemController;
