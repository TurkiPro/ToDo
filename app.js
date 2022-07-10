const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/ToDo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const schema = new mongoose.Schema({ title: String });
const Task = mongoose.model('Task', schema);


//insert
app.get('/create', (req, res) => {
    const fisrtTask = new Task({ title: 'writing insert function' });
    fisrtTask.save().then(() => console.log('new record inserted'));
})

app.listen(3000, () => console.log('express started on port 3000'));


