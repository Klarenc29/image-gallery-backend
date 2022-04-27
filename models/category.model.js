const sql = require("../config/db.config");

// constructor
const Category = function(category) {
  this.name = category.name;
};

Category.get = (result) => {
    let query = "SELECT * FROM categories"

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categories: ", res);
    result(null, res);
  });
};

module.exports = Category;