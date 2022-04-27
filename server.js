var express = require('express');
require('dotenv').config();
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 4000;

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// serving static files
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res, next) => {
   res.send("Images API");
});

require("./routes/images.routes.js")(app);
require("./routes/categories.routes.js")(app);

app.listen(port, () => {
    console.log('Server started on: ' + port);
});