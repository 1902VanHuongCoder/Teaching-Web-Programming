// 1. Tạo hàm nhận về danh sách xã phường dựa trên mã tỉnh/thành phố

import { xaPhuong } from "./duLieuXaPhuong";

export const nhanDanhSachXaPhuong = (maTinh) => {
     const danhSachXaPhuong = xaPhuong.filter(
       (item) => item.province_code === parseInt(maTinh)
     );
     return danhSachXaPhuong;
}; 