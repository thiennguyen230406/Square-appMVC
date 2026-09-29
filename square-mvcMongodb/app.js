require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const squareRoutes = require('./routes/squareRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Thiếu MONGODB_URI trong file .env');
  process.exit(1);
}

// Sử dụng EJS làm view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware (express đã có sẵn urlencoded, không cần body-parser)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng routes
app.use('/', squareRoutes);

// Kết nối MongoDB rồi mới chạy ứng dụng
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Không kết nối được MongoDB:', err.message);
    process.exit(1);
  });
