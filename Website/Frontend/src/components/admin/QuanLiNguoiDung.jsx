import React, { useState } from "react";

// Demo/mock data for users
const initialUsers = [
  {
    id: 1,
    username: "nguyenvana",
    email: "a@gmail.com",
    phone: "0901234567",
    status: "Hoạt động",
    role: "Khách hàng",
  },
  {
    id: 2,
    username: "tranthib",
    email: "b@gmail.com",
    phone: "0912345678",
    status: "Bị khóa",
    role: "Khách hàng",
  },
  {
    id: 3,
    username: "admin",
    email: "admin@bookstore.com",
    phone: "0999999999",
    status: "Hoạt động",
    role: "Quản trị viên",
  },
];

const STATUS_OPTIONS = ["Hoạt động", "Bị khóa"];

function QuanLiNguoiDung() {
  const [users, setUsers] = useState(initialUsers);

  // Update user status
  const handleStatusChange = (id, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#00809D]">
        Quản lý người dùng
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#00809D]">
          Danh sách tài khoản
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Tên người dùng</th>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Số điện thoại</th>
                <th className="py-2 px-3">Quyền</th>
                <th className="py-2 px-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 font-bold">{idx + 1}</td>
                  <td className="py-2 px-3">{user.username}</td>
                  <td className="py-2 px-3">{user.email}</td>
                  <td className="py-2 px-3">{user.phone}</td>
                  <td className="py-2 px-3">{user.role}</td>
                  <td className="py-2 px-3">
                    <select
                      value={user.status}
                      onChange={(e) =>
                        handleStatusChange(user.id, e.target.value)
                      }
                      className={`border rounded p-1 ${
                        user.status === "Bị khóa"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
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

export default QuanLiNguoiDung;
