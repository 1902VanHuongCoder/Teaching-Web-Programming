import Navigation from "../Navigation";
import Banner from "../Banner";
import {products} from "../../lib/data";
function Homepage() {
    return (
      <div className="bg-[#00809D] min-h-screen h-fit">
        {/* Thanh điều hướng - Navigation */}
        <Navigation />

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
          <h3 className="py-6 px-4 text-xl text-white font-bold">
            Sản Phẩm Mới
          </h3>
          <ul className="grid grid-cols-4 gap-4 px-4">
            {products.map((product) => (
              <li key={product.maSP} className="w-full h-fit rounded-md">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={product.hinhAnh}
                    alt={product.tenSP}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 bg-transparent">
                  <h4 className="font-semibold text-white">{product.tenSP}</h4>
                  <p className=" text-white">
                    Giá giảm: {product.giaGiam.toLocaleString()} VNĐ
                  </p>
                  <p className="text-gray-400 line-through text-sm">
                    Giá gốc: {product.gia.toLocaleString()} VNĐ
                  </p>
                  <button className="mt-4 bg-white text-[#00809D] py-1 px-2 w-full rounded-full font-bold">
                    Thêm Giỏ Hàng
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chân trang - Footer */}
        {/* <div className="px-10 py-10 bg-gray-800 text-white text-center">
          <p>Bản quyền © 2023 Công ty TNHH ABC</p>
        </div> */}
      </div>
    );
}

export default Homepage;
