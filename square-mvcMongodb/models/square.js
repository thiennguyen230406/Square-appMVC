const mongoose = require('mongoose');

// Định nghĩa schema cho hình vuông
const squareSchema = new mongoose.Schema(
  {
    sideLength: { type: Number, required: true },
    perimeter: { type: Number, required: true },
    area: { type: Number, required: true },
  },
  { timestamps: true } // tự thêm createdAt, updatedAt
);

// Tạo model từ schema (collection: squares)
const Square = mongoose.model('Square', squareSchema);

module.exports = Square;
