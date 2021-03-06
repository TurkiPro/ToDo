const Task = require('../models/tasks');

module.exports = {
    index: (req, res) => {
        Task.find({}, (error, tasks) => {
            if (error) console.log('there was an error: ${error}');
            else {
                res.render("todo.ejs", { todotasks: tasks });
            }

        });
    },

    create: (req, res) => {
        const fisrtTask = new Task({ title: req.body.title });
        fisrtTask.save().then(() => res.redirect("/"));
    },

    edit: (req, res) => {
        const id = req.params.id;
        Task.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { todotasks: tasks, idTask: id });
        });
    },

    update: (req, res) => {
        const id = req.params.id;
        Task.findByIdAndUpdate(id, { title: req.body.title },
            (error) => {
                if (error) console.log('there was an error: ${error}');
                else res.redirect("/");
            });

    },

    delete: (req, res) => {
        Task.deleteOne({ _id: req.params.id }, (error) => {
            if (error) console.log('there was an error: ${error}');
            else {
                res.redirect("/");
            }
        });
    }
}