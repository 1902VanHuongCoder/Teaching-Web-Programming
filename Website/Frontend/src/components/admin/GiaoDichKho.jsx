import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

// Demo/mock data for inventory transactions
const initialTransactions = [
  {
    id: 1,
    type: "Nhập kho",
    date: "2025-09-10",
    product: "Thần Đồng Đất Phương Nam",
    quantity: 100,
    user: "Nguyễn Văn A",
    note: "Nhập lô mới",
    details: [
      { field: "Số lượng nhập", value: 100 },
      { field: "Nhà cung cấp", value: "NXB Kim Đồng" },
    ],
  },
  {
    id: 2,
    type: "Xuất kho",
    date: "2025-09-12",
    product: "Ngôn tình",
    quantity: 20,
    user: "Trần Thị B",
    note: "Xuất bán cho khách",
    details: [
      { field: "Số lượng xuất", value: 20 },
      { field: "Khách hàng", value: "Lê Văn C" },
    ],
  },
  {
    id: 3,
    type: "Cập nhật kho",
    date: "2025-09-13",
    product: "Kinh dị",
    quantity: 0,
    user: "Admin",
    note: "Điều chỉnh tồn kho",
    details: [
      { field: "Số lượng cũ", value: 50 },
      { field: "Số lượng mới", value: 45 },
    ],
  },
];

function QuanLiGiaoDichKho() {
  const [transactions] = useState(initialTransactions);
  const [viewId, setViewId] = useState(null);

  const handleView = (id) => {
    setViewId(viewId === id ? null : id);
  };

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
              <tr className="bg-gray-100">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Loại giao dịch</th>
                <th className="py-2 px-3">Ngày</th>
                <th className="py-2 px-3">Sản phẩm</th>
                <th className="py-2 px-3">Số lượng</th>
                <th className="py-2 px-3">Người thực hiện</th>
                <th className="py-2 px-3">Ghi chú</th>
                <th className="py-2 px-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tran, idx) => (
                <React.Fragment key={tran.id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 font-bold">{idx + 1}</td>
                    <td className="py-2 px-3">{tran.type}</td>
                    <td className="py-2 px-3">{tran.date}</td>
                    <td className="py-2 px-3">{tran.product}</td>
                    <td className="py-2 px-3">{tran.quantity}</td>
                    <td className="py-2 px-3">{tran.user}</td>
                    <td className="py-2 px-3">{tran.note}</td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleView(tran.id)}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                        title="Xem chi tiết"
                      >
                        <FaEye />
                        Xem
                      </button>
                    </td>
                  </tr>
                  {viewId === tran.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={8} className="p-4">
                        <div className="border-l-4 border-[#00809D] pl-4">
                          <h3 className="font-bold text-[#00809D] mb-2">
                            Chi tiết giao dịch
                          </h3>
                          <ul className="list-disc ml-6">
                            {tran.details.map((d, i) => (
                              <li key={i} className="mb-1">
                                <span className="font-semibold">
                                  {d.field}:
                                </span>{" "}
                                {d.value}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuanLiGiaoDichKho;
