import { FaStar } from "react-icons/fa";

// Demo/mock data for comments
const initialComments = [
  {
    id: 1,
    book: "Thần Đồng Đất Phương Nam",
    user: "Nguyễn Văn A",
    rating: 5,
    comment: "Sách rất hay, giao hàng nhanh!",
    date: "2025-09-10",
    status: "Hiển thị",
  },
  {
    id: 2,
    book: "Ngôn tình",
    user: "Trần Thị B",
    rating: 4,
    comment: "Nội dung ổn, bìa đẹp.",
    date: "2025-09-11",
    status: "Ẩn",
  },
];

function QuanLiBinhLuan() {
  const comments = initialComments;
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
                <th className="py-2 px-3">Sách</th>
                <th className="py-2 px-3">Người dùng</th>
                <th className="py-2 px-3">Đánh giá</th>
                <th className="py-2 px-3">Bình luận</th>
                <th className="py-2 px-3">Ngày</th>
                <th className="py-2 px-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((c, idx) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 font-bold">{idx + 1}</td>
                  <td className="py-2 px-3">{c.book}</td>
                  <td className="py-2 px-3">{c.user}</td>
                  <td className="py-2 px-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i <= c.rating
                            ? "text-yellow-400 inline"
                            : "text-gray-300 inline"
                        }
                      />
                    ))} 
                  </td>
                  <td className="py-2 px-3">{c.comment}</td>
                  <td className="py-2 px-3">{c.date}</td>
                  <td className="py-2 px-3">{c.status}</td>
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
