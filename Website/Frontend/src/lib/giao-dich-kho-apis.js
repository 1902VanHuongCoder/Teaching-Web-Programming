import { BASE_URL } from "./baseUrl";

// 1. Lấy tất cả giao dịch kho
export const layTatCaGiaoDichKho = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/giao-dich-kho`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            success: true,
            data: data
        };
    } catch (error) {
        console.error("Lỗi khi lấy danh sách giao dịch kho:", error);
        return {
            success: false,
            message: "Không thể tải danh sách giao dịch kho",
            error: error.message
        };
    }
};

// 2. Tạo giao dịch kho mới
export const taoGiaoDichKho = async (giaoDichKhoData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/giao-dich-kho`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(giaoDichKhoData),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            success: true,
            data: data,
            message: "Tạo giao dịch kho thành công"
        };
    } catch (error) {
        console.error("Lỗi khi tạo giao dịch kho:", error);
        return {
            success: false,
            message: "Không thể tạo giao dịch kho mới",
            error: error.message
        };
    }
};

// 3. Xóa giao dịch kho theo ID
export const xoaGiaoDichKho = async (maGiaoDich) => {
    try {
        const response = await fetch(`${BASE_URL}/api/giao-dich-kho/${maGiaoDich}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
            if (response.status === 404) {
                return {
                    success: false,
                    message: "Giao dịch kho không tồn tại",
                    error: "Không tìm thấy giao dịch kho để xóa"
                };
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            success: true,
            data: data,
            message: "Xóa giao dịch kho thành công"
        };
    } catch (error) {
        console.error("Lỗi khi xóa giao dịch kho:", error);
        return {
            success: false,
            message: "Không thể xóa giao dịch kho",
            error: error.message
        };
    }
};