import { useState, useEffect, useContext } from "react";
import { bannerBooks } from "../lib/data";
import { CiSearch } from "react-icons/ci";
import image05 from "../assets/image5.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user-context";
function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0); // Hook của React
  const [giaTriTimKiem, setGiaTriTimKiem] = useState("");

  // Sử dụng giá trị user từ context 
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  // Tự động chạy carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000); // đổi slide mỗi 3s
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrev = () => {
    // Previous
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? bannerBooks.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLast = currentIndex === bannerBooks.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const xuLyTimKiem = () => {
    // Xử lý tìm kiếm
    if (giaTriTimKiem.trim() !== "") {
      navigate(`/ketquatimkiem?q=${encodeURIComponent(giaTriTimKiem)}`);
    }
  };

  const xuLyTimKiemKhiEnter = (e) => {
    if (e.key === "Enter") {
      xuLyTimKiem();
    }
  };

  const handleChuyenDenTrangHoSoNguoiDung = () => {
    navigate("/hosonguoidung");
  }

  return (
    <div className="w-full px-4">
      {/* Slides */}
      <div className="flex justify-between items-center px-10 py-3.5 bg-[#00809D] text-white">
        <div className="flex items-center">
          <div onClick={handleChuyenDenTrangHoSoNguoiDung} className="w-[40px] h-[40px] rounded-full overflow-hidden mr-4">
            {/* Avatar */}
            <img src={user?.avatar.url || image05} alt="avatar" />
          </div>
          <div>
            {/* Tên người dùng */}
            <p className="text-white font-semibold">
              {user?.tenNguoiDung || "Người dùng"}
            </p>
            <p className=" text-sm text-gray-300">{user?.email || "Email"}</p>
          </div>
        </div>
        <div className="w-1/2 relative">
          <input
            type="text"
            placeholder="Tìm kiếm sách..."
            className="w-full rounded-full bg-white outline-none p-2 text-black px-4"
            value={giaTriTimKiem}
            onChange={(e) => setGiaTriTimKiem(e.target.value)}
            onKeyDown={xuLyTimKiemKhiEnter}
          />
          <div
            onClick={xuLyTimKiem}
            className="absolute top-2.5 right-4 text-black text-xl font-extrabold"
          >
            <CiSearch />
          </div>
        </div>
      </div>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform ease-in-out duration-700"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {bannerBooks.map((book) => (
            <div
              key={book.id}
              className="w-full h-[400px] flex flex-shrink-0 flex-col items-center"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <p className="mt-2 text-white font-semibold">{book.title}</p>
            </div>
          ))}
        </div>

        {/* Nút điều khiển trái phải */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white text-black  w-[30px] h-[30px] rounded-full"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white text-black w-[30px] h-[30px] rounded-full"
        >
          ›
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerBooks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-gray-400" : "bg-white"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
