const Category = require("../models/category.model");

// Get Categories from the database.
exports.get = (req, res) => {
  Category.get((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting categories."
      });
    else res.send(data);
  });
};
