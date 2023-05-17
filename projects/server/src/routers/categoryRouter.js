const route = require('express').Router();
const { categoryController } = require('../controllers');
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.get('/',categoryController.getAllCategory)

route.get("/getallcategory", categoryController.getAllCategoryTenant);
route.post("/addcategory", categoryController.addCategory);
route.patch("/deletecategory", categoryController.deleteCategory);
route.patch("/editcategory", categoryController.editCategory);

module.exports = route;

module.exports = route;