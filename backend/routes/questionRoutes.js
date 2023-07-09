const express = require('express')
const router = express.Router()
const QuestCtrl = require('../controllers/questionController')


router.get('/:testId', QuestCtrl.getQuestion);
router.post('/', QuestCtrl.createQuestion);
router.put('/:id', QuestCtrl.updateQuestion);
router.delete('/:id', QuestCtrl.deleteQuestion);
module.exports = router