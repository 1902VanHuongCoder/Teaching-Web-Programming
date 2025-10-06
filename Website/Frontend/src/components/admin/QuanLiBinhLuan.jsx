import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { layTatCaBinhLuan } from "../../lib/binh-luan-apis";

// Demo/mock data for comments
// const initialComments = [
//   {
//     id: 1,
//     book: "Thần Đồng Đất Phương Nam",
//     user: "Nguyễn Văn A",
//     rating: 5,
//     comment: "Sách rất hay, giao hàng nhanh!",
//     date: "2025-09-10",
//     status: "Hiển thị",
//   },
//   {
//     id: 2,
//     book: "Ngôn tình",
//     user: "Trần Thị B",
//     rating: 4,
//     comment: "Nội dung ổn, bìa đẹp.",
//     date: "2025-09-11",
//     status: "Ẩn",
//   },
// ];

function QuanLiBinhLuan() {
  // Danh sách bình luận (sẽ lấy từ server trong thực tế)
  const [binhLuan, setBinhLuan] = useState([]);

    /**
     * binhLuan = [{
     *  binhLuanID,
     *  sachID,
     *  nguoiDungID,
     *  noiDung,
     *  danhGia,
     * }, {...}]
     */

    useEffect(() => {
      // Gọi API để lấy danh sách bình luận từ server
      const napDuLieuBinhLuan = async () => {
       const phanHoiTuSever = await layTatCaBinhLuan();
       if(phanHoiTuSever && phanHoiTuSever.success) {
          setBinhLuan(phanHoiTuSever.data); // Cập nhật danh sách bình luận từ server
        } else {
          console.error("Lỗi khi tải bình luận:", phanHoiTuSever.message);
        }
      };
      napDuLieuBinhLuan();
    }, []);
  

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#00809D]">
        Xem bình luận & đánh giá
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#00809D]">
          Danh sách bình luận
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Mã sách</th>
                <th className="py-2 px-3">Mã người dùng</th>
                <th className="py-2 px-3">Đánh giá</th>
                <th className="py-2 px-3">Bình luận</th>
                <th className="py-2 px-3">Ngày</th>
              </tr>
            </thead>
            <tbody>
              {binhLuan && binhLuan.length > 0 && binhLuan.map((c, idx) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 font-bold">{idx + 1}</td>
                  <td className="py-2 px-3">{c.sachID}</td>
                  <td className="py-2 px-3">{c.nguoiDungID}</td>
                  <td className="py-2 px-3 flex justify-center items-center">
                    {[...Array(5)].map((star, i) => {
                      const ratingValue = i + 1;
                      return (
                        <FaStar
                          key={i}
                          size={20}
                          color={ratingValue <= c.danhGia ? "#ffc107" : "#e4e5e9"}
                        />
                      );
                    })}
                  </td>
                  <td className="py-2 px-3">{c.noiDung}</td>
                  <td className="py-2 px-3">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuanLiBinhLuan;
