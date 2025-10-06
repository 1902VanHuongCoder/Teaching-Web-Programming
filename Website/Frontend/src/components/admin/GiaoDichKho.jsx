import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { layTatCaGiaoDichKho } from "../../lib/giao-dich-kho-apis";

function QuanLiGiaoDichKho() {

  // Biến trạng thái để lưu trữ danh sách giao dịch kho
  const [giaoDichKho, setGiaoDichKho] = useState([]);

  // Nạp tất cả giao dịch kho từ server 
  useEffect(() => {
    const napDuLieuNhapKho = async () => {
      const phanHoiTuSever = await layTatCaGiaoDichKho();
      if (phanHoiTuSever && phanHoiTuSever.success) {
        setGiaoDichKho(phanHoiTuSever.data);
      }
    };
    napDuLieuNhapKho();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#00809D]">
        Quản lý giao dịch kho
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#00809D]">
          Danh sách giao dịch
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Mã GD</th>
                <th className="py-2 px-3">Loại GD</th>
                <th className="py-2 px-3">Ngày GD</th>
                <th className="py-2 px-3">Sản phẩm</th>
                <th className="py-2 px-3">Số lượng</th>
                <th className="py-2 px-3">Người thực hiện</th>
                <th className="py-2 px-3">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {giaoDichKho && giaoDichKho.length > 0 ? (
                giaoDichKho.map((gd) => (
                    <tr className="border-b hover:bg-gray-50" key={gd.maGiaoDich}>
                      <td className="py-2 px-3">{gd.maGiaoDich}</td>
                      <td className="py-2 px-3">{gd.loaiGiaoDich}</td>
                      <td className="py-2 px-3">
                        {new Date(gd.ngayGiaoDich).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-3">{gd.tenSanPham}</td>
                      <td className="py-2 px-3">{gd.soLuong}</td>
                      <td className="py-2 px-3">{gd.nguoiThucHien}</td>
                      <td className="py-2 px-3">{gd.ghiChu || "-"}</td>
                </tr> 
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8" 
                    className="py-4 px-3 text-center text-gray-500"
                  >
                    Chưa có giao dịch kho nào.
                  </td>
                </tr>
              )} 
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuanLiGiaoDichKho;
