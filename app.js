const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/ToDo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const schema = new mongoose.Schema({ title: String });
const Task = mongoose.model('Task', schema);


//insert
app.post('/create', (req, res) => {
    const fisrtTask = new Task({ title: req.body.title });
    fisrtTask.save().then(() => res.redirect("/"));
});

//find
app.get('/', (req, res) => {
    Task.find({}, (error, tasks) => {
        if (error) console.log('there was an error: ${error}');
        else {
            res.render("todo.ejs");
        }

    });
});

//delete
app.get('/delete/:id', (req, res) => {
    Task.deleteOne({ _id: req.params.id }, (error) => {
        if (error) console.log('there was an error: ${error}');
        else {
            console.log('Task is deleted');
        }
    });
});

//update
app.get('/update/:id/:title', (req, res) => {
    Task.updateOne({ _id: req.params.id }, { title: req.params.title },
        (error) => {
            if (error) console.log('there was an error: ${error}');
            else {
                console.log('one Task is updated');
            }
        });
});


app.listen(3000, () => console.log('express started on port 3000'));


