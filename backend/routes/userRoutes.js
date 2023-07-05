const express = require('express')
const router = express.Router()
const UserCtrl = require('../controllers/userController')
const RefreshCtrl = require('../controllers/refreshController')

router.get("/", UserCtrl.getAllUser);
router
    .route('/')
    .post(UserCtrl.registerUser);
router.post('/login', UserCtrl.authUser);
router.post('/token',RefreshCtrl.refreshToken) ; 
router.put('/:balance/:id', UserCtrl.updateBalance);
router.put('/:id', UserCtrl.updateUser);

router.delete('/:id', UserCtrl.deleteUser);



module.exports = router