const express = require('express');  											
const router = express.Router();  											
const hinhVuongController = require('../controllers/hinhVuongController');  										
											
// Route để hiển thị form  											
router.get('/', hinhVuongController.showForm);  										
											
// Route để tính chu vi và diện tích  											
router.post('/calculate', hinhVuongController.calculateSquare);  										
											
module.exports = router;