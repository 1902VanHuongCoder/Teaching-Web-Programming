import { DataTypes } from 'sequelize';
import sequelize from '../config/mysql-config.js';

const DanhMucSach = sequelize.define('DanhMucSach', {
    danhMucSachID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tenDanhMuc: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'danh-muc-sach',
    timestamps: false
});

export default DanhMucSach;
