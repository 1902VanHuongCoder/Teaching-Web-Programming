function Homepage() {
    return (
      <div>
        {/* Thanh điều hướng - Navigation */}
        <nav className="px-10 py-10 flex justify-between items-center bg-gray-800 text-white">
          <div>Logo</div>
          <ul className="flex space-x-4 justify-end items-center">
            <li>Trang Chủ</li>
            <li>Giới Thiệu</li>
            <li>Dịch Vụ</li>
            <li>Liên Hệ</li>
          </ul>
        </nav>

        {/* Banner - Banner */}
        <div className="px-10 py-10 w-full h-[300px] bg-blue-500 text-white flex justify-center items-center">
          <h2>Chào mừng đến với trang web của chúng tôi!</h2>
        </div>

        {/* Danh mục - Categories */}
        <div className="px-10 py-10 bg-green-500 w-full ">
          <h3>Danh mục</h3>
          <ul className="flex space-x-4">
            <li>Truyện tranh</li>
            <li>Truyện phiêu lưu</li>
            <li>Truyện ngôn tình</li>
            <li>Sách sức khỏe</li>
          </ul>
        </div>

        {/* Danh sách sản phẩm - Product List */}
        <div>
          <h3>Danh sách sản phẩm</h3>
          <ul className="grid grid-cols-4 gap-4">
            <li className="w-full h-[200px] bg-gray-300 rounded-md">Sản phẩm 1</li>
            <li className="w-full h-[200px] bg-gray-300 rounded-md">Sản phẩm 2</li>
            <li className="w-full h-[200px] bg-gray-300 rounded-md">Sản phẩm 3</li>
            <li className="w-full h-[200px] bg-gray-300 rounded-md">Sản phẩm 4</li>
            <li className="w-full h-[200px] bg-gray-300 rounded-md">Sản phẩm 1</li>
            <li className="w-full h-[200px] bg-gray-300 rounded-md">Sản phẩm 2</li>
            <li className="w-full h-[200px] bg-gray-300 rounded-md">Sản phẩm 3</li>
            <li className="w-full h-[200px] bg-gray-300 rounded-md">Sản phẩm 4</li>
          </ul>
        </div>

        {/* Chân trang - Footer */}
        <div className="px-10 py-10 bg-gray-800 text-white text-center">
          <p>Bản quyền © 2023 Công ty TNHH ABC</p>
        </div>
      </div>
    );
}

export default Homepage;
