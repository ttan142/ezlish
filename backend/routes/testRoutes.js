const express = require('express')
const router = express.Router()
const TestCtrl = require('../controllers/testController')
const auth = require("../middleware/authMiddleware");
router.get('/ielts',auth.protect, TestCtrl.getIeltsInfo);
router.get("/toeic",TestCtrl.getToeicInfo);
router.get("/", TestCtrl.getAllTest);
router.get("/:resultId", TestCtrl.getTestByResult);  
router.get("/name", TestCtrl.getAllTestNames);
router.get('/name/:name', TestCtrl.findTestByName);
router.post('/', TestCtrl.createTest); 
router.put('/test/:questionId', TestCtrl.addQuestionToTest);
router.put('/:id', TestCtrl.updateTest);
router.delete('/:id', TestCtrl.deleteTest);
module.exports = router


//get Test by resultid
//router.get('/toeic',auth.protect,TestCtrl.getToeicInfo);  // for protected routes