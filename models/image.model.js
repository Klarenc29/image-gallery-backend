const sql = require("../config/db.config");

// constructor
const Image = function(image) {
  this.filename = image.filename;
  this.filesize = image.filesize;
  this.content_type = image.content_type;
  this.title = image.title;
  this.category = image.category;
  this.keywords = image.keywords;
};

Image.create = (newImage, result) => {
  sql.query("INSERT INTO images SET ?", newImage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created image: ", { id: res.insertId, ...newImage });
    result(null, { id: res.insertId, ...newImage });
  });
};



Image.query = (searchTerm, category, result) => {
    let query = "SELECT i.filename, i.title, i.keywords, c.name as category FROM images i JOIN categories c ON i.category = c.id WHERE i.keywords LIKE '%" + searchTerm + "%'";
    if(category !== undefined){
       query += " AND i.category = " + category +";";
    }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("images: ", res);
    result(null, res);
  });
};

module.exports = Image;