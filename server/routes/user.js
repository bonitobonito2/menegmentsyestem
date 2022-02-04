const express = require('express')
const routes = express.Router()
const userController =require('../controllers/userController')

routes.get('/',userController.view)
routes.post('/',userController.find)
routes.get('/adduser',userController.form)
routes.post('/adduser',userController.takeform)
routes.get('/edituser/:id',userController.edit)
routes.post('/edituser/:id',userController.update)
routes.get('/:id',userController.delete)




module.exports = routes