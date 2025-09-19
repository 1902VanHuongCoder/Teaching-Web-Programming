import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/mysql-config.js';
import sachRoutes from './routes/sachRoutes.js';
import danhDanhMucSachRoutes from './routes/danhMucSachRoutes.js';
import donHangRoutes from './routes/donHangRoutes.js';
import nguoiDungRoutes from './routes/nguoiDungRoutes.js';
import binhLuanRoutes from './routes/binhLuanRoutes.js';
import khuyenMaiRoutes from './routes/khuyenMaiRoutes.js';

// Đọc biến môi trường từ file .env 
dotenv.config(); 

// Khởi tạo ứng dụng Express 
const app = express();

// Sử dụng các middleware cần thiết 
app.use(cors());
app.use(express.json()); // Để parse JSON request body 

// Kiểm tra kết nối dến database MySQL 
sequelize.authenticate().then(() => console.log('Kết nối đến MySQL thành công')).catch(err => console.error('Không thể kết nối đến MySQL:', err));




// Định nghĩa các routes cho API

app.use("/api/sach", sachRoutes); // Sử dụng các routes 
app.use("/api/danh-muc-sach", danhDanhMucSachRoutes); 
app.use('/api/don-hang', donHangRoutes);
app.use("/api/nguoi-dung", nguoiDungRoutes); 
app.use("/api/binh-luan", binhLuanRoutes);
app.use("/api/khuyen-mai", khuyenMaiRoutes); 





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





