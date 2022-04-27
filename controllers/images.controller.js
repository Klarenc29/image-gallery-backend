const MyImage = require("../models/image.model");

// Create and Save a new Image
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (!req.file) {
    return res.status(400).send({ message: 'Please upload an image.' });
 }

  // Create a Image
  const image = new MyImage({
    filename: req.file.filename,
    filesize: req.file.size,
    content_type: req.file.mimetype,
    title: req.body.title,
    category: req.body.category,
    keywords: req.body.keywords,
  });

  // Save Image in the database
  MyImage.create(image, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Image."
      });
    else res.send(data);
  });
};

// Get Images from the database (with condition).
exports.query = (req, res) => {
    const query = req.query.query ?? '';
    const category = req.query.category;

  MyImage.query(query, category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting images."
      });
    else res.send(data);
  });
};
