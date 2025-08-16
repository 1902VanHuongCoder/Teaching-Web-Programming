import { useState, useEffect } from "react";
import { bannerBooks } from "../lib/data";
import { CiSearch } from "react-icons/ci";
import image05 from "../assets/image5.png";
function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0); // Hook của React

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

  return (
    <div className="w-full px-4">
      {/* Slides */}
      <div className="flex justify-between items-center px-10 py-3.5 bg-[#00809D] text-white">
        <div className="flex items-center">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden mr-4">
            {/* Avatar */}
            <img src={image05} alt="avatar" />
          </div>
          <div>
            {/* Tên người dùng */}
            <p className="text-white font-semibold">Khang</p>
            <p className=" text-sm text-gray-300">khang@gmail.com</p>
          </div>
        </div>
        <div className="w-1/2 relative">
          <input
            type="text"
            placeholder="Tìm kiếm sách..."
            className="w-full rounded-full bg-white outline-none p-2 text-black px-4"
          />
          <div className="absolute top-2.5 right-4 text-black text-xl font-extrabold">
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
