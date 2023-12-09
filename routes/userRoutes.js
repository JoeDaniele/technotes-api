const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
//router object created using express
//'/' we're at /users
//any GET requests will be directed by a controller CREATE
//looking for a POST will be handled by controller  READ
//PATCH is related to update                        UPDATE
//DELETE method                                     DELETE
