module.exports = app => {
    const categories = require("../controllers/categories.controller");
  
    var router = require("express").Router();
  
    // Get categories
    router.get("/", categories.get);
  
    app.use('/api/categories', router);
  };