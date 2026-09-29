const Square = require('../models/square');

// Lấy 10 lần tính gần nhất từ MongoDB
const getHistory = () => Square.find().sort({ createdAt: -1 }).limit(10).lean();

// Controller để hiển thị form
exports.showForm = async (req, res) => {
  try {
    const history = await getHistory();
    res.render('index', { perimeter: null, area: null, error: null, history });
  } catch (err) {
    console.error(err);
    res.status(500).send('Không đọc được dữ liệu từ MongoDB');
  }
};

// Controller để tính chu vi, diện tích và lưu vào MongoDB
exports.calculateSquare = async (req, res) => {
  try {
    const sideLength = parseFloat(req.body.sideLength);

    // Kiểm tra dữ liệu đầu vào
    if (!Number.isFinite(sideLength) || sideLength <= 0) {
      const history = await getHistory();
      return res.status(400).render('index', {
        perimeter: null,
        area: null,
        error: 'Cạnh phải là số lớn hơn 0.',
        history,
      });
    }

    const perimeter = 4 * sideLength;
    const area = sideLength * sideLength;

    // Tạo mới hình vuông và lưu vào MongoDB
    const square = new Square({ sideLength, perimeter, area });
    await square.save();

    const history = await getHistory();
    res.render('index', { perimeter, area, error: null, history });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi lưu dữ liệu vào MongoDB');
  }
};
