// 1. Tạo hàm đăng ký 
import { BASE_URL } from "./baseUrl.js";

export const dangKyTaiKhoan = async (nguoiDung) => {
    try {
        const response = await fetch(`${BASE_URL}/api/nguoi-dung/dang-ky`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nguoiDung)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        throw error;
    }
};

// 2. Tạo hàm đăng nhập
export const dangNhapTaiKhoan = async (email, matKhau) => {
    try {
        const response = await fetch(`${BASE_URL}/api/nguoi-dung/dang-nhap`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, matKhau })
        });
        const data = await response.json(); 
        
        if( !response.ok ) { 
            return { status: response.ok , message: data.message, user: null }; 
        } else {
            return { status: response.ok , message: data.message, user: data.user };
        }
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        throw error;
    }
};


// 3. Tạo hàm để cập nhật thông tin người dùng
export const capNhatThongTinNguoiDung = async (nguoiDungID, thongTinMoi) => {
    try {
        const response = await fetch(`${BASE_URL}/api/nguoi-dung/${nguoiDungID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(thongTinMoi)
        });
        const data = await response.json(); 
        if( !response.ok ) { 
            return { status: response.ok , message: data.message, userData: null }; 
        } else {
            return { status: response.ok , message: data.message, userData: data.user };
        }
    }
    catch (error) {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        throw error;
    }
};







