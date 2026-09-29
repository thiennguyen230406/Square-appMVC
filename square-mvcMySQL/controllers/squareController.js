const Square = require('../models/square');

const history = [];

const getHistory = () => history.slice(-10).reverse();

// Controller để hiển thị form
exports.showForm = async (req, res) => {
  res.render('index', { perimeter: null, area: null, error: null, history: getHistory() });
};

// Controller để tính chu vi, diện tích và lưu lịch sử trong bộ nhớ
exports.calculateSquare = async (req, res) => {
  const sideLength = parseFloat(req.body.sideLength);

  if (!Number.isFinite(sideLength) || sideLength <= 0) {
    return res.status(400).render('index', {
      perimeter: null,
      area: null,
      error: 'Cạnh phải là số lớn hơn 0.',
      history: getHistory(),
    });
  }

  const square = new Square(sideLength);
  history.push(square);

  res.render('index', {
    perimeter: square.perimeter,
    area: square.area,
    error: null,
    history: getHistory(),
  });
};
