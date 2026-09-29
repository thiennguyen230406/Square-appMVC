const squareModel = require('../models/hinhVuong');  										
												
// Controller để hiển thị form  												
exports.showForm = (req, res) => {  												
    res.render('hinhVuong', { perimeter: null, area: null });  
};  												
												
// Controller để tính chu vi và diện tích và lưu vào MySQL  												
exports.calculateSquare = async (req, res) => {  												
    const { sideLength } = req.body;  												
												
    const perimeter = 4 * sideLength;  												
    const area = sideLength * sideLength;  												
												
    try {  												
        await squareModel.saveSquareData(sideLength, perimeter, area);  												
        res.render('hinhVuong', { perimeter, area });  
    } catch (error) {  												
        console.error('Error saving to database', error);  												
        res.status(500).send('Server Error');  												
    }  												
};