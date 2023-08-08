const express = require('express')
const router = express.Router()
const FlashcardCtrl = require('../controllers/flashcardController')

router.get("/", FlashcardCtrl.getAllFlashcard);
router.get("/category", FlashcardCtrl.getCategoryFlashcard);
router.get('/:category', FlashcardCtrl.findFlashcardByCategory);
router.post("/add", FlashcardCtrl.addFlashcard);
router.put('/:id', FlashcardCtrl.updateFlashcard);
router.delete('/:id', FlashcardCtrl.deleteFlashcard);
module.exports = router