import { DataTypes } from 'sequelize';
import sequelize from "../config/mysql-config.js";

const TinTuc = sequelize.define('TinTuc', {
    tinTucID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tieuDe: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    hinhAnhTieuDe: { // url 
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
    hinhAnhNoiDung: { // Hình ảnh trong phần nội dung ["url1", "url2",...] 
        type: DataTypes.TEXT, // Sử dụng TEXT để lưu mảng JSON 
        allowNull: true,
    }, 
    ngayDang: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    noiDung: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'tin-tuc',
    timestamps: true, // Bật các trường createdAt và updatedAt
});

export default TinTuc;
