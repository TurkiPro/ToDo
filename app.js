const exports = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/ToDo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
