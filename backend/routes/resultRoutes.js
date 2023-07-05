const express = require('express')
const router = express.Router()
const ResultCtrl = require('../controllers/resultController')


// all test 1 user have done
router.get("/:userId/", ResultCtrl.getAllResult);  
router.post('/:testId/', ResultCtrl.saveResult);
//detail 1 test
router.get("/test/:resultId", ResultCtrl.getTestResult); 
router.get("/answer/:resultId", ResultCtrl.getAnswerResult);
router.get("/answer/details/:resultId", ResultCtrl.getDetailResult);
module.exports = router

// body is userId (getAllResult test have done)
// query string with userId and testId