/**
 * Hệ thống tính phí vận chuyển dựa trên khoảng cách giữa các tỉnh/thành phố
 * Địa chỉ cửa hàng: Thành phố Cần Thơ (code: 92)
 */

// Mã tỉnh/thành phố của cửa hàng (Cần Thơ)
const MA_TINH_CUA_HANG = 92;

/**
 * Bảng khoảng cách ước tính từ Cần Thơ đến các tỉnh/thành phố khác (km)
 * Dựa trên khoảng cách đường bộ thực tế
 */
const BANG_KHOANG_CACH = {
    1: 1700,   // Hà Nội
    4: 1850,   // Cao Bằng  
    8: 1750,   // Tuyên Quang
    11: 1900,  // Điện Biên
    12: 1950,  // Lai Châu
    14: 1800,  // Sơn La
    15: 1850,  // Lào Cai
    19: 1650,  // Thái Nguyên
    20: 1800,  // Lạng Sơn
    22: 1600,  // Quảng Ninh
    24: 1680,  // Bắc Ninh
    25: 1720,  // Phú Thọ
    31: 1650,  // Hải Phòng
    33: 1670,  // Hưng Yên
    37: 1600,  // Ninh Bình
    38: 1500,  // Thanh Hóa
    40: 1400,  // Nghệ An
    42: 1300,  // Hà Tĩnh
    44: 1200,  // Quảng Trị
    46: 1100,  // Thừa Thiên Huế
    48: 950,   // Đà Nẵng
    51: 850,   // Quảng Ngãi
    52: 750,   // Gia Lai
    56: 650,   // Khánh Hòa
    66: 550,   // Đắk Lắk
    68: 450,   // Lâm Đồng
    75: 250,   // Đồng Nai
    79: 170,   // TP. Hồ Chí Minh
    80: 200,   // Tây Ninh
    82: 80,    // Đồng Tháp
    86: 50,    // Vĩnh Long
    91: 120,   // An Giang
    92: 0,     // Cần Thơ (cửa hàng)
    96: 180,   // Cà Mau
};


export const tinhPhiVanChuyen = (maTinh) => {   
    let phiVanChuyen = 0;
    const khoangCach = BANG_KHOANG_CACH[maTinh];
    console.log("Khoảng cách đến mã tỉnh", maTinh, "là", khoangCach, "km");
    if (khoangCach <= 100) {
        phiVanChuyen = 20000; // Phí cố định 20,000 VND cho khoảng cách <= 100km
    } else if (khoangCach <= 500) {
        phiVanChuyen = 30000 + (khoangCach - 100) * 150; // 30,000 VND + 150 VND/km cho 100 < khoảng cách <= 500km
    } else {
        phiVanChuyen = 90000 + (khoangCach - 500) * 100; // 90,000 VND + 100 VND/km cho khoảng cách > 500km
    }
    return phiVanChuyen;
};