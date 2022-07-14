const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
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
            res.render("todo.ejs", { todotasks: tasks });
        }

    });
});

//delete
app.delete('/delete/:id', (req, res) => {
    Task.deleteOne({ _id: req.params.id }, (error) => {
        if (error) console.log('there was an error: ${error}');
        else {
            res.redirect("/");
        }
    });
});

//update
app.get('/update/:id', (req, res) => {
    const id = req.params.id;
    Task.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", { todotasks: tasks, idTask: id });
    });
});


app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndUpdate(id, { title: req.body.title },
        (error) => {
            if (error) console.log('there was an error: ${error}');
            else res.redirect("/");
        });

});


app.listen(3000, () => console.log('express started on port 3000'));


