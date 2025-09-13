import React, { useState } from "react";

// Demo/mock data for orders
const initialOrders = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Lê Lợi, Q.1, TP.HCM",
    date: "2025-09-10",
    total: 250000,
    status: "Chờ xác nhận",
    items: [
      { name: "Thần Đồng Đất Phương Nam", qty: 2, price: 100000 },
      { name: "Truyện tranh", qty: 1, price: 50000 },
    ],
  },
  {
    id: 2,
    customer: "Trần Thị B",
    phone: "0912345678",
    address: "456 Nguyễn Trãi, Q.5, TP.HCM",
    date: "2025-09-11",
    total: 180000,
    status: "Đang giao",
    items: [
      { name: "Ngôn tình", qty: 1, price: 80000 },
      { name: "Kinh dị", qty: 2, price: 50000 },
    ],
  },
];

const STATUS_OPTIONS = [
  "Chờ xác nhận",
  "Đã xác nhận",
  "Đang giao",
  "Hoàn thành",
  "Đã hủy",
];

function QuanLiDonHang() {
  const [orders, setOrders] = useState(initialOrders); 

  // Update order status
  const handleStatusChange = (id, newStatus) => {
    // Tạo một bản sau của cái mảng orders với trạng thái mới cho đơn hàng được cập nhật 
    const danhSachDonHangDaCapNhat = orders.map((order) => {
        if(order.id === id) {
            return { ...order, status: newStatus };
        }else{
            return order;
        }
    });
    setOrders(danhSachDonHangDaCapNhat); 
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#00809D]">
        Quản lý đơn hàng
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#00809D]">
          Danh sách đơn hàng
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Khách hàng</th>
                <th className="py-2 px-3">SĐT</th>
                <th className="py-2 px-3">Địa chỉ</th>
                <th className="py-2 px-3">Ngày đặt</th>
                <th className="py-2 px-3">Tổng tiền</th>
                <th className="py-2 px-3">Trạng thái</th>
                <th className="py-2 px-3">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 font-bold">{idx + 1}</td>
                    <td className="py-2 px-3">{order.customer}</td>
                    <td className="py-2 px-3">{order.phone}</td>
                    <td className="py-2 px-3">{order.address}</td>
                    <td className="py-2 px-3">{order.date}</td>
                    <td className="py-2 px-3">
                      {order.total.toLocaleString()} VNĐ
                    </td>
                    <td className="py-2 px-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="border rounded p-1"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-3">
                      <details>
                        <summary className="cursor-pointer text-blue-600 hover:underline">
                          Xem
                        </summary>
                        <div className="mt-2 bg-gray-50 p-2 rounded">
                          <strong>Sản phẩm:</strong>
                          <ul className="list-disc ml-5">
                            {order.items.map((item, i) => (
                              <li key={i}>
                                {item.name} x {item.qty} (
                                {item.price.toLocaleString()} VNĐ)
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    </td>
                  </tr>
             
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuanLiDonHang;
