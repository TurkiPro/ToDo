const router = require('express').Router();
const tasksController = require('../controllers/tasks');

//find all tasks 
router.get('/', tasksController.index);


//create a new task 
router.post('/create', tasksController.create);

//update a task
router.get('/update/:id', tasksController.edit);
router.put('/update/:id', tasksController.update);

//delete a task
router.delete('/delete/:id', tasksController.delete);

module.exports = router;
