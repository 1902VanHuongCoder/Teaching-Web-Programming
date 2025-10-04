import Navigation from "../Navigation";
import Banner from "../Banner";
import { useContext, useEffect, useState } from "react";
import Footer from "../Footer";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { nhanTatCaCacQuyenSach } from "../../lib/sach-apis";
import { nhanTatCaDanhMucSach } from "../../lib/danh-muc-sach-apis";
import { layGioHangTheoNguoiDung, themSanPhamVaoGioHang } from "../../lib/gio-hang-apis";
import { GioHangContext } from "../../contexts/gio-hang-context";

const CATEGORIES = [
  // Danh mục
  "Tất cả",
  "Truyện tranh",
  "ngôn tình",
  "phiêu lưu",
  "kinh dị",
];

const PRICE_RANGES = [
  // Vùng giá
  { label: "Tất cả", value: "all" },
  { label: "Dưới 50.000", value: "<50000" },
  { label: "50.000 - 100.000", value: "50000-100000" },
  { label: "Trên 100.000", value: ">100000" },
  { label: "Trên 200.000", value: ">200000" },
];

function Homepage() {
  // Sử dụng context để lấy và cập nhật giỏ hàng
  const { setGioHang } = useContext(GioHangContext);

  const [selectedCategory, setSelectedCategory] = useState(0); // Danh mục được chọn
  const [selectedPrice, setSelectedPrice] = useState("all"); // Vùng giá được chọn

  const [chuDeTrangWeb, setChuDeTrangWeb] = useState("light");
  // Tạo 2 biến trạng thái khác để lưu trữ danh mục và vùng giá được chọn cho sản phẩm bán chạy

  // Biến trạng thái để lưu trữ danh sách sản phẩm lấy từ backend
  const [danhSachSanPham, setDanhSachSanPham] = useState([]);

  // Lọc sản phẩm theo danh mục và giá
  const filteredProducts = danhSachSanPham.filter((product) => {
    // Sử dụng ChatGPT để hiểu hơn về đoạn code này.
    let matchCategory =
      selectedCategory == 0 || // '0' => 0 , 
      (product.loaiSach &&
        product.loaiSach === selectedCategory);
    let matchPrice = true;
    if (selectedPrice === "<50000") {
      matchPrice = product.giaGiam < 50000;
    } else if (selectedPrice === "50000-100000") {
      matchPrice = product.giaGiam >= 50000 && product.giaGiam <= 100000;
    } else if (selectedPrice === ">100000") {
      matchPrice = product.giaGiam > 100000;
    }
    return matchCategory && matchPrice;
  });

  // Thêm useEffect để nạp dữ liệu thật từ sever
  useEffect(() => {
    const napTatCaSanPham = async () => {
      const data = await nhanTatCaCacQuyenSach();
      if (data) {
        // Chuyển đổi chuỗi JSON của trường images thành mảng để sử dụng
        data.forEach((sach) => {
          sach.images = JSON.parse(sach.images);
        });

        setDanhSachSanPham(data);
      }
    };
    napTatCaSanPham();
  }, []);

  // Thêm 1 biến trạng thái để lưu trữ danh mục sản phẩm
  const [danhMucSach, setDanhMucSach] = useState([]);
  // Thêm 1 useEffect để nạp dữ liệu danh mục sản phẩm từ server
  useEffect(() => {
    const napDanhMucSach = async () => {
      const data = await nhanTatCaDanhMucSach();
   
      if (data) {
        // Bổ sung thêm vào danh sách danh mục một mục "Tất cả" ở đầu tiên
        data.unshift({ danhMucSachID: 0, tenDanhMuc: "Tất cả" });

      console.log(data); 

        setDanhMucSach(data);
      }
    };
    napDanhMucSach();
  }, []);

  console.log("Danh mục sách:", selectedCategory  ); 


  // Hàm để xử lý thêm sản phẩm vào giỏ hàng 
  const handleThemSanPhamVaoGioHang = async (sachID, soLuong, giaLucThem) => {
    const storedUser = localStorage.getItem("user"); 
    if(!storedUser) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return; 
    }
    const user = JSON.parse(storedUser);
    const nguoiDungID = user.nguoiDungID;

    const phanHoiTuSever = await themSanPhamVaoGioHang(nguoiDungID, sachID, soLuong, giaLucThem);

    if(phanHoiTuSever && phanHoiTuSever.success) {

        // Lấy lại tất cả các sản phẩm trong giỏ hàng để cập nhật lại số lượng sản phẩm trong giỏ hàng ở Navigation
          const data = await layGioHangTheoNguoiDung(nguoiDungID);
          if (data) {
            console.log("Dữ liệu giỏ hàng sau khi thêm sản phẩm:", data);
            // Cập nhật số lượng sản phẩm trong giỏ hàng ở Navigation thông qua context
            setGioHang(data.gioHang.ChiTietGioHangs || []);
          }

        alert("Đã thêm sản phẩm vào giỏ hàng!");
    } else {
        alert("Thêm sản phẩm vào giỏ hàng thất bại! " + (phanHoiTuSever.message || ""));
    }
  };

  return (
    <div className="bg-[#00809D] min-h-screen h-fit">
      {/* Thanh điều hướng - Navigation */}
      <Navigation
        chuDeTrangWeb={chuDeTrangWeb}
        setChuDeTrangWeb={setChuDeTrangWeb}
      />

      {/* Banner - Banner */}
      <Banner />

      {/* Danh mục - Categories */}
      {/* <div className="px-10 py-10 bg-green-500 w-full ">
          <h3>Danh mục</h3>
          <ul className="flex space-x-4">
            <li>Truyện tranh</li>
            <li>Truyện phiêu lưu</li>
            <li>Truyện ngôn tình</li>
            <li>Sách sức khỏe</li>
          </ul>
        </div> */}

      {/* Sản phẩm mới */}
      <div className="mt-10 h-fit">
        <h3 className="py-6 px-4 text-xl text-white font-bold">Sản Phẩm Mới</h3>

        {/* Bộ lọc theo danh mục và giá */}
        <div className="flex justify-between items-center flex-wrap px-4 py-6 bg-[#00718a] rounded-lg mx-4 mb-6">
          <p className="text-white text-xl">Bộ Lọc Sản Phẩm Mới</p>
          <div className="flex gap-4">
            <div>
              <label className="text-white font-semibold mr-2">Danh mục:</label>
              <select
                className="py-2 bg-white rounded-full outline-none pl-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {danhMucSach.map((cat) => (
                  <option key={cat.danhMucSachID} value={cat.danhMucSachID}>
                    {cat.tenDanhMuc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white font-semibold mr-2">Giá:</label>
              <select
                className=" bg-white rounded-full outline-none pl-2 py-2"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                {PRICE_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-5 gap-4 px-4 gap-y-10">
          {filteredProducts.map((product) => (
            <li key={product.maSP} className="w-full h-fit rounded-md">
              <Link to={`/chitietsanpham/${product.sachID}`}>
                <div className="w-full h-[350px] rounded-xl overflow-hidden">
                  <img
                    src={product.images[0]?.url}
                    alt={product.tenSach}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              <div className="p-2 bg-transparent">
                <h4 className="font-semibold text-white uppercase py-2">
                  {product.tenSach}
                </h4>

                <p
                  className={`text-[#00f821] font-bold ${
                    product.giaGiam ? "" : "hidden"
                  }`}
                >
                  {product.giaGiam.toLocaleString()} VNĐ
                </p>
                <p
                  className={`font-bold ${
                    product.giaGiam
                      ? "line-through text-gray-400"
                      : "text-[#00f821]"
                  }`}
                >
                  {product.giaBan.toLocaleString()} VNĐ
                </p>

                <button
                  onClick={() => handleThemSanPhamVaoGioHang(product.sachID, 1, product.giaGiam || product.giaBan)}
                  className="flex justify-center items-center hover:scale-105 hover:cursor-pointer transition-all gap-x-2 mt-4 bg-white text-[#00809D] py-1 px-2 w-full rounded-full font-bold"
                >
                  <span>
                    <FaShoppingCart />
                  </span>
                  <span>Thêm Giỏ Hàng</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Chân trang - Footer */}
      <Footer />
    </div>
  );
}

export default Homepage;
