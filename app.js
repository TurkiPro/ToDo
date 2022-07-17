const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const router = require('./routes/tasks');

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "test") {
    mongoose.connect('mongodb://localhost:27017/ToDo', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
else {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ToDo', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

app.use('/', router);


if (process.env.NODE_ENV === "test") app.set("port", 3001);
else app.set("port", process.env.NODE_ENV || 3000);

app.listen(3000, () => console.log('express started on port 3000'));


