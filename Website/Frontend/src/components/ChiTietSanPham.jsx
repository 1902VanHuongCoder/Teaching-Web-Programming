import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { FaStar, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import Footer from "./Footer";
// import {chiTietSanPhams} from "../lib/data"; 
import { Link, useParams } from "react-router-dom";
import { layChiTietSach } from "../lib/sach-apis";

function ChiTietSanPham() {
  const [anhIndex, setAnhIndex] = useState(0);
  const [soLuong, setSoLuong] = useState(1);

  // Biến trạng thái để lưu trữ thông tin sản phẩm
  const [chiTietSanPham, setChiTietSanPham] = useState(null); 

  // Sử dụng useParam để lấy sachID 
  const { sachID } = useParams();

  const giamSoLuong = () => {
    // variable scope
    if (soLuong > 1) {
      let soLuongMoi = soLuong - 1;
      setSoLuong(soLuongMoi);
    }
  };

  const tangSoLuong = () => {
    if (soLuong < chiTietSanPham.soLuongConLai) {
      let soLuongMoi = soLuong + 1;
      setSoLuong(soLuongMoi);
    }
  };


  // Sử dụng useEffect để nạp dữ liệu sản phẩm từ server dựa vào sachID
  useEffect(() => {
     const napChiTietSanPham = async () => {

        const chiTietSanPham = await layChiTietSach(sachID);

        if(chiTietSanPham) {

          // Chuyển dữ liệu hình ảnh (images) về dạng mảng 
          chiTietSanPham.images = JSON.parse(chiTietSanPham.images);

          console.log("Chi tiết sản phẩm từ server:", chiTietSanPham);

          setChiTietSanPham(chiTietSanPham);
        }
     }

     napChiTietSanPham();

  }, [sachID]);


  


  if(!chiTietSanPham) {
    return <div>Đang tải chi tiết sản phẩm...</div>;
  }

  return (
    <div className="bg-[#f5f7fa] min-h-screen w-full">
      <Navigation />
      {/* <h1 className="text-4xl font-bold text-center my-8">CHI TIẾT SẢN PHẨM</h1> */}
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Hình ảnh sản phẩm */}
        <div className="flex flex-col items-center">
          <div className="w-[350px] h-[500px] rounded-xl overflow-hidden shadow-lg mb-4 bg-white flex items-center justify-center">
            <img
              src={chiTietSanPham.images[anhIndex].url}
              alt={chiTietSanPham.tenSP}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            {chiTietSanPham.images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={"Ảnh phụ " + (idx + 1)}
                className={`w-16 h-24 object-cover rounded cursor-pointer border-2 ${
                  anhIndex === idx ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => {
                  setAnhIndex(idx);
                }} // arrow function
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-[#00809D] mb-2">
            {chiTietSanPham.tenSach}
          </h2>
          {chiTietSanPham.danhGia && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(chiTietSanPham.danhGia)
                        ? ""
                        : "text-gray-300"
                    }
                  />
                ))}
              </span>
              <span className="text-gray-600 ml-2">
                {chiTietSanPham.danhGia}/5
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-base">
            <div>
              <span className="font-semibold">Tác giả:</span>{" "}
              {chiTietSanPham.tacGia}
            </div>
            <div>
              <span className="font-semibold">Nhà xuất bản:</span>{" "}
              {chiTietSanPham.nhaXuatBan}
            </div>
            <div>
              <span className="font-semibold">Ngày xuất bản:</span>{" "}
              {chiTietSanPham.ngayXuatBan}
            </div>
            <div>
              <span className="font-semibold">Ngôn ngữ:</span>{" "}
              {chiTietSanPham.ngonNgu}
            </div>
            <div>
              <span className="font-semibold">Loại sách:</span>{" "}
              {chiTietSanPham.loaiSach}
            </div>
            <div>
              <span className="font-semibold">Số trang:</span>{" "}
              {chiTietSanPham.soTrang}
            </div>
            <div>
              <span className="font-semibold">Định dạng:</span>{" "}
              {chiTietSanPham.dinhDang}
            </div>
            <div>
              <span className="font-semibold">Số lượng còn lại:</span>{" "}
              {chiTietSanPham.soLuongConLai}
            </div>
            <div>
              <span className="font-semibold">ISBN13:</span>{" "}
              {chiTietSanPham.ISBN13}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className={`text-2xl text-[#00f821] font-bold ${chiTietSanPham.giaGiam ? "" : "hidden"}`}>
              {chiTietSanPham.giaGiam.toLocaleString()} VNĐ
            </span>
            <span className={`text-xl ${chiTietSanPham.giaGiam ? "text-gray-400 line-through" : "text-[#00f821] font-bold"}`}>
              {chiTietSanPham.giaBan.toLocaleString()} VNĐ
            </span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={giamSoLuong}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <FaMinus />
            </button>
            <span className="text-lg font-bold w-8 text-center">{soLuong}</span>
            <button
              onClick={tangSoLuong}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <FaPlus />
            </button>
            <Link
              to="/giohang"
              className="flex items-center gap-2 bg-[#00809D] text-white px-6 py-2 rounded-full font-bold hover:bg-[#006b85] ml-6 transition-all"
            >
              <FaShoppingCart /> Thêm vào giỏ hàng
            </Link>
          </div>
        </div>
      </div>

      {/* Bình luận */}
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-[#00809D] mb-4">Bình luận</h3>
        <div className="space-y-4">
          {/* {chiTietSanPham.binhLuan.map(
            (
              c,
              idx // comment, c = {user: ..., rating: ..., comment: ...}
            ) => (
              <div key={idx} className="border-b pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#00809D]">{c.user}</span>
                  <span className="text-yellow-400 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < c.rating ? "" : "text-gray-300"}
                      />
                    ))}
                  </span>
                </div>
                <p className="text-gray-700 ml-2">{c.comment}</p>
              </div>
            )
          )} */}
        </div>
      </div>

      {/* Sách liên quan */}
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-[#00809D] mb-4">
          Sách liên quan
        </h3>
        <ul className="grid grid-cols-4 gap-6 ">
          {/* {chiTietSanPhams.map((chiTietSanPham) => (
            <li key={chiTietSanPham.maSP} className="w-full h-fit rounded-md">
              <div className="w-full h-[350px] rounded-xl overflow-hidden">
                <img
                  src={chiTietSanPham.hinhAnh}
                  alt={chiTietSanPham.tenSP}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 bg-transparent">
                <h4 className="font-semibold uppercase py-2">
                  {chiTietSanPham.tenSP}
                </h4>
                <p className=" text-[#205d28] font-bold">
                  {chiTietSanPham.giaGiam.toLocaleString()} VNĐ
                </p>
                <p className="text-gray-500 line-through text-sm mt-2">
                  Giá gốc: {chiTietSanPham.gia.toLocaleString()} VNĐ
                </p>
                <Link to="/giohang" className="flex justify-center items-center hover:scale-105 hover:cursor-pointer transition-all gap-x-2 mt-4 bg-[#00809D] text-white py-1 px-2 w-full rounded-full font-bold">
                  <span>
                    <FaShoppingCart />
                  </span>
                  <span>Thêm Giỏ Hàng</span>
                </Link>
              </div>
            </li>
          ))} */}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default ChiTietSanPham;
