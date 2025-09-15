import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/mysql-config.js';
import sachRoutes from './routes/sachRoutes.js';

// Đọc biến môi trường từ file .env 
dotenv.config(); 

// Khởi tạo ứng dụng Express 
const app = express();

// Sử dụng các middleware cần thiết 
app.use(cors());
app.use(express.json()); // Để parse JSON request body 

// Kiểm tra kết nối dến database MySQL 
sequelize.authenticate().then(() => console.log('Kết nối đến MySQL thành công')).catch(err => console.error('Không thể kết nối đến MySQL:', err));

// Đinh nghĩa một route mẫu (GET /)
app.get('/', (req, res) => {     
    res.send('Chào mừng đến với API của cửa hàng sách!'); 
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'API is running' });
});

app.get("/api/testnodemon", (req, res) => {
    res.send("Nodemon is working!");
})

app.use("/api/sach", sachRoutes); // Sử dụng các routes cho sách

// Lắng nghe các kết nối đến server 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
}); 

// Đồng bộ hóa các model với database (tạo bảng nếu chưa tồn tại)
sequelize.sync().then(() => {
    console.log("Đồng bộ hóa database thành công");
}).catch(err => {
    console.error("Lỗi khi đồng bộ hóa database:", err);
});





