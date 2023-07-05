const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// GET /api/exams
router.get('/', examController.getAllExam);

// GET /api/exams/:id
router.get('/:name/:category', examController.getExam);

router.get('/exist', examController.getExistExam);


// POST /api/exams
router.post('/', examController.createExam);

// PUT /api/exams/:id
router.put('/:id', examController.updateExam);

// DELETE /api/exams/:id
router.delete('/:id', examController.deleteExam);

module.exports = router;
