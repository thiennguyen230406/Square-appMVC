require('dotenv').config({ path: '.env' });
const express = require('express');  										
const bodyParser = require('body-parser');  										
const hinhVuongRoutes = require('./routes/hinhVuongRoute');  										
										
const app = express();  										
const PORT = process.env.PORT || 3000;  										
										
// Sử dụng EJS làm view engine  										
app.set('view engine', 'ejs');  										
app.set('views', './views');  										
app.use(express.static('public'));
										
// Middleware  										
app.use(bodyParser.urlencoded({ extended: true }));  										
										
// Sử dụng routes  										
app.use('/', hinhVuongRoutes);  										
										
// Chạy ứng dụng  										
app.listen(PORT, () => {  										
    console.log(`Server is running on http://localhost:${PORT}`);  										
});