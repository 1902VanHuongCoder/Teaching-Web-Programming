import React, { useState } from 'react';
import { FaBook, FaShieldAlt, FaTruck, FaUndo, FaUserShield, FaGavel, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

/**
 * Component hiển thị điều khoản và quy định của cửa hàng sách
 * Bao gồm các chính sách về mua hàng, giao hàng, đổi trả, bảo mật và điều khoản sử dụng
 */
const DieuKhoanVaQuyDinh = ({ dongChinhSach }) => {
    // State quản lý tab đang được chọn
    const [activeTab, setActiveTab] = useState('dieu-khoan-su-dung');


    /**
     * Danh sách các tab điều khoản và quy định
     */
    const tabs = [
        {
            id: 'dieu-khoan-su-dung',
            title: 'Điều Khoản Sử Dụng',
            icon: <FaGavel />,
            color: 'blue'
        },
        {
            id: 'chinh-sach-ban-hang',
            title: 'Chính Sách Bán Hàng',
            icon: <FaBook />,
            color: 'green'
        },
        {
            id: 'chinh-sach-giao-hang',
            title: 'Chính Sách Giao Hàng',
            icon: <FaTruck />,
            color: 'orange'
        },
        {
            id: 'chinh-sach-doi-tra',
            title: 'Chính Sách Đổi Trả',
            icon: <FaUndo />,
            color: 'purple'
        },
        {
            id: 'chinh-sach-bao-mat',
            title: 'Chính Sách Bảo Mật',
            icon: <FaUserShield />,
            color: 'red'
        },
        {
            id: 'bao-hanh-ho-tro',
            title: 'Bảo Hành & Hỗ Trợ',
            icon: <FaShieldAlt />,
            color: 'indigo'
        }
    ];

    /**
     * Nội dung chi tiết cho từng tab
     */
    const tabContent = {
        'dieu-khoan-su-dung': (
            <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <div className="flex items-center">
                        <FaGavel className="text-blue-500 mr-2" />
                        <h3 className="font-semibold text-blue-800">Điều Khoản Sử Dụng Website</h3>
                    </div>
                </div>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">1. Chấp Nhận Điều Khoản</h4>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Bằng việc truy cập và sử dụng website của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này. 
                        Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.
                    </p>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">2. Quyền và Trách Nhiệm của Người Dùng</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                            <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            Cung cấp thông tin chính xác và đầy đủ khi đăng ký tài khoản
                        </li>
                        <li className="flex items-start">
                            <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            Bảo mật thông tin tài khoản và mật khẩu cá nhân
                        </li>
                        <li className="flex items-start">
                            <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            Không sử dụng website cho các mục đích bất hợp pháp
                        </li>
                        <li className="flex items-start">
                            <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            Tôn trọng quyền sở hữu trí tuệ của cửa hàng và bên thứ ba
                        </li>
                    </ul>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">3. Điều Khoản Thanh Toán</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600 leading-relaxed">
                            Tất cả các giao dịch trên website được thực hiện bằng tiền Việt Nam Đồng (VND). 
                            Chúng tôi chấp nhận các hình thức thanh toán: chuyển khoản ngân hàng, ví điện tử, 
                            và thanh toán khi nhận hàng (COD) tại một số khu vực.
                        </p>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">4. Giới Hạn Trách Nhiệm</h4>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <div className="flex items-start">
                            <FaExclamationTriangle className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                            <p className="text-gray-700 leading-relaxed">
                                Cửa hàng không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp, 
                                ngẫu nhiên, đặc biệt hoặc mang tính hậu quả nào phát sinh từ việc sử dụng website này.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">5. Thay Đổi Điều Khoản</h4>
                    <p className="text-gray-600 leading-relaxed">
                        Chúng tôi có quyền cập nhật và thay đổi các điều khoản này bất kỳ lúc nào mà không cần thông báo trước. 
                        Việc tiếp tục sử dụng website sau khi có thay đổi được coi là bạn đã chấp nhận các điều khoản mới.
                    </p>
                </section>
            </div>
        ),

        'chinh-sach-ban-hang': (
            <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <div className="flex items-center">
                        <FaBook className="text-green-500 mr-2" />
                        <h3 className="font-semibold text-green-800">Chính Sách Bán Hàng</h3>
                    </div>
                </div>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">1. Sản Phẩm và Dịch Vụ</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-800 mb-2">Sách In</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Sách văn học, giáo dục, khoa học</li>
                                <li>• Truyện tranh, manga, light novel</li>
                                <li>• Sách tham khảo, từ điển</li>
                                <li>• Sách thiếu nhi</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-800 mb-2">Phụ Kiện</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Bookmark, thẻ đánh dấu</li>
                                <li>• Bìa bọc sách, túi đựng sách</li>
                                <li>• Văn phòng phẩm đọc sách</li>
                                <li>• Quà tặng độc giả</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">2. Giá Cả và Khuyến Mãi</h4>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                                <h5 className="font-medium text-gray-800">Giá Niêm Yết</h5>
                                <p className="text-gray-600 text-sm">Giá được hiển thị rõ ràng trên website, bao gồm thuế VAT.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                                <h5 className="font-medium text-gray-800">Chương Trình Khuyến Mãi</h5>
                                <p className="text-gray-600 text-sm">Giảm giá theo mùa, combo sách, tích điểm thành viên.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                                <h5 className="font-medium text-gray-800">Voucher và Mã Giảm Giá</h5>
                                <p className="text-gray-600 text-sm">Áp dụng theo điều kiện cụ thể, không được chuyển nhượng.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">3. Quy Trình Đặt Hàng</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <ol className="space-y-2 text-gray-700">
                            <li className="flex items-center">
                                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
                                Chọn sách và thêm vào giỏ hàng
                            </li>
                            <li className="flex items-center">
                                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
                                Kiểm tra thông tin và địa chỉ giao hàng
                            </li>
                            <li className="flex items-center">
                                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">3</span>
                                Chọn phương thức thanh toán
                            </li>
                            <li className="flex items-center">
                                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">4</span>
                                Xác nhận đơn hàng và hoàn tất thanh toán
                            </li>
                        </ol>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">4. Xác Nhận Đơn Hàng</h4>
                    <p className="text-gray-600 leading-relaxed">
                        Sau khi đặt hàng thành công, quý khách sẽ nhận được email xác nhận với thông tin chi tiết đơn hàng. 
                        Chúng tôi sẽ liên hệ trong vòng 24 giờ để xác nhận thông tin và thời gian giao hàng.
                    </p>
                </section>
            </div>
        ),

        'chinh-sach-giao-hang': (
            <div className="space-y-6">
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                    <div className="flex items-center">
                        <FaTruck className="text-orange-500 mr-2" />
                        <h3 className="font-semibold text-orange-800">Chính Sách Giao Hàng</h3>
                    </div>
                </div>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">1. Khu Vực Giao Hàng</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h5 className="font-medium text-green-800 mb-2">Nội Thành Cần Thơ</h5>
                            <p className="text-sm text-gray-600 mb-2">Giao hàng trong 24 giờ</p>
                            <p className="text-sm font-medium text-green-700">Phí: 15,000 VND</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h5 className="font-medium text-blue-800 mb-2">Đồng Bằng Sông Cửu Long</h5>
                            <p className="text-sm text-gray-600 mb-2">Giao hàng trong 2-3 ngày</p>
                            <p className="text-sm font-medium text-blue-700">Phí: 25,000 - 35,000 VND</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <h5 className="font-medium text-purple-800 mb-2">Toàn Quốc</h5>
                            <p className="text-sm text-gray-600 mb-2">Giao hàng trong 3-7 ngày</p>
                            <p className="text-sm font-medium text-purple-700">Phí: 35,000 - 70,000 VND</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">2. Phương Thức Giao Hàng</h4>
                    <div className="space-y-4">
                        <div className="border border-gray-200 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-800">Giao Hàng Tiêu Chuẩn</h5>
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Phổ biến</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">Giao hàng trong giờ hành chính (8:00 - 17:00)</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Thời gian: 2-7 ngày làm việc</li>
                                <li>• Miễn phí giao hàng cho đơn hàng trên 500,000 VND</li>
                                <li>• Hỗ trợ đóng gói cẩn thận</li>
                            </ul>
                        </div>
                        
                        <div className="border border-gray-200 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-800">Giao Hàng Nhanh</h5>
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">+50% phí</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">Giao hàng ưu tiên trong ngày hoặc 24h</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Thời gian: Trong ngày hoặc 1 ngày làm việc</li>
                                <li>• Chỉ áp dụng tại nội thành các thành phố lớn</li>
                                <li>• Phí bổ sung 50% phí giao hàng thường</li>
                            </ul>
                        </div>

                        <div className="border border-gray-200 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-800">Nhận Tại Cửa Hàng</h5>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Miễn phí</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">Đến trực tiếp cửa hàng để nhận sách</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Địa chỉ: 123 Đường Cách Mạng Tháng 8, Cần Thơ</li>
                                <li>• Giờ mở cửa: 8:00 - 20:00 hàng ngày</li>
                                <li>• Sách được giữ trong 7 ngày</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">3. Lưu Ý Khi Nhận Hàng</h4>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <FaExclamationTriangle className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                                Kiểm tra kỹ sản phẩm trước khi ký nhận
                            </li>
                            <li className="flex items-start">
                                <FaExclamationTriangle className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                                Báo ngay nếu có bất kỳ hư hỏng nào
                            </li>
                            <li className="flex items-start">
                                <FaExclamationTriangle className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                                Giữ lại hóa đơn và bao bì để đổi trả nếu cần
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        ),

        'chinh-sach-doi-tra': (
            <div className="space-y-6">
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                    <div className="flex items-center">
                        <FaUndo className="text-purple-500 mr-2" />
                        <h3 className="font-semibold text-purple-800">Chính Sách Đổi Trả</h3>
                    </div>
                </div>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">1. Điều Kiện Đổi Trả</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h5 className="font-medium text-green-800 mb-3 flex items-center">
                                <FaCheckCircle className="mr-2" />
                                Được Chấp Nhận
                            </h5>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>• Sách bị lỗi in ấn, thiếu trang</li>
                                <li>• Sách bị hư hỏng trong quá trình vận chuyển</li>
                                <li>• Giao sai sản phẩm so với đơn hàng</li>
                                <li>• Sách còn nguyên tem, nhãn mác</li>
                                <li>• Trong vòng 7 ngày kể từ ngày nhận hàng</li>
                            </ul>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                            <h5 className="font-medium text-red-800 mb-3 flex items-center">
                                <FaExclamationTriangle className="mr-2" />
                                Không Chấp Nhận
                            </h5>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>• Sách đã qua sử dụng, có dấu hiệu đọc</li>
                                <li>• Sách bị rách, bẩn do người dùng</li>
                                <li>• Không còn hóa đơn mua hàng</li>
                                <li>• Quá thời hạn đổi trả</li>
                                <li>• Sách thuộc chương trình khuyến mãi đặc biệt</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">2. Quy Trình Đổi Trả</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">1</div>
                                <div>
                                    <h5 className="font-medium text-gray-800">Liên Hệ Hỗ Trợ</h5>
                                    <p className="text-gray-600 text-sm">Gọi hotline 1900-xxxx hoặc email support@bookstore.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">2</div>
                                <div>
                                    <h5 className="font-medium text-gray-800">Cung Cấp Thông Tin</h5>
                                    <p className="text-gray-600 text-sm">Mã đơn hàng, lý do đổi trả, hình ảnh sản phẩm (nếu có)</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">3</div>
                                <div>
                                    <h5 className="font-medium text-gray-800">Xác Nhận Yêu Cầu</h5>
                                    <p className="text-gray-600 text-sm">Nhân viên xem xét và phản hồi trong 24 giờ</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">4</div>
                                <div>
                                    <h5 className="font-medium text-gray-800">Gửi Trả Sản Phẩm</h5>
                                    <p className="text-gray-600 text-sm">Đóng gói cẩn thận và gửi về địa chỉ cửa hàng</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">5</div>
                                <div>
                                    <h5 className="font-medium text-gray-800">Hoàn Tất</h5>
                                    <p className="text-gray-600 text-sm">Hoàn tiền hoặc gửi sản phẩm mới trong 3-5 ngày</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">3. Phí Đổi Trả</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Trường Hợp</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Phí Vận Chuyển</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Xử Lý</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Lỗi từ cửa hàng</td>
                                    <td className="border border-gray-300 px-4 py-2 text-green-600 font-medium">Miễn phí</td>
                                    <td className="border border-gray-300 px-4 py-2">Đổi mới hoặc hoàn tiền 100%</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">Khách hàng đổi ý</td>
                                    <td className="border border-gray-300 px-4 py-2 text-orange-600 font-medium">Khách thanh toán</td>
                                    <td className="border border-gray-300 px-4 py-2">Hoàn tiền 90% (trừ phí xử lý)</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">Sản phẩm bị hư hỏng do khách</td>
                                    <td className="border border-gray-300 px-4 py-2 text-red-600 font-medium">Không chấp nhận</td>
                                    <td className="border border-gray-300 px-4 py-2">Không đổi trả</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        ),

        'chinh-sach-bao-mat': (
            <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <div className="flex items-center">
                        <FaUserShield className="text-red-500 mr-2" />
                        <h3 className="font-semibold text-red-800">Chính Sách Bảo Mật Thông Tin</h3>
                    </div>
                </div>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">1. Thu Thập Thông Tin</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-800 mb-2">Thông Tin Chúng Tôi Thu Thập:</h5>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start">
                                <FaCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                Thông tin cá nhân: Họ tên, số điện thoại, email, địa chỉ
                            </li>
                            <li className="flex items-start">
                                <FaCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                Thông tin giao dịch: Lịch sử mua hàng, phương thức thanh toán
                            </li>
                            <li className="flex items-start">
                                <FaCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                Thông tin kỹ thuật: Địa chỉ IP, trình duyệt, thiết bị sử dụng
                            </li>
                            <li className="flex items-start">
                                <FaCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                Thông tin hành vi: Trang đã xem, sách quan tâm, thời gian truy cập
                            </li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">2. Mục Đích Sử Dụng</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-800 mb-2">Mục Đích Chính</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Xử lý đơn hàng và giao hàng</li>
                                <li>• Hỗ trợ khách hàng</li>
                                <li>• Xác nhận giao dịch</li>
                                <li>• Quản lý tài khoản</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-800 mb-2">Mục Đích Phụ</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Gửi thông báo khuyến mãi</li>
                                <li>• Cải thiện dịch vụ</li>
                                <li>• Phân tích hành vi người dùng</li>
                                <li>• Bảo mật và chống gian lận</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">3. Bảo Vệ Thông Tin</h4>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <FaShieldAlt className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                                <h5 className="font-medium text-gray-800">Mã Hóa SSL</h5>
                                <p className="text-gray-600 text-sm">Tất cả dữ liệu được mã hóa khi truyền tải</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <FaShieldAlt className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                                <h5 className="font-medium text-gray-800">Tường Lửa Bảo Mật</h5>
                                <p className="text-gray-600 text-sm">Hệ thống firewall ngăn chặn truy cập trái phép</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <FaShieldAlt className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                                <h5 className="font-medium text-gray-800">Phân Quyền Truy Cập</h5>
                                <p className="text-gray-600 text-sm">Chỉ nhân viên được ủy quyền mới có thể truy cập dữ liệu</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <FaShieldAlt className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                                <h5 className="font-medium text-gray-800">Sao Lưu Định Kỳ</h5>
                                <p className="text-gray-600 text-sm">Dữ liệu được sao lưu và lưu trữ an toàn</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">4. Quyền Của Khách Hàng</h4>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <FaUserShield className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                                Quyền được biết thông tin nào được thu thập
                            </li>
                            <li className="flex items-start">
                                <FaUserShield className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                                Quyền yêu cầu cập nhật, sửa đổi thông tin cá nhân
                            </li>
                            <li className="flex items-start">
                                <FaUserShield className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                                Quyền yêu cầu xóa tài khoản và dữ liệu
                            </li>
                            <li className="flex items-start">
                                <FaUserShield className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                                Quyền từ chối nhận email marketing
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        ),

        'bao-hanh-ho-tro': (
            <div className="space-y-6">
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                    <div className="flex items-center">
                        <FaShieldAlt className="text-indigo-500 mr-2" />
                        <h3 className="font-semibold text-indigo-800">Bảo Hành và Hỗ Trợ Khách Hàng</h3>
                    </div>
                </div>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">1. Cam Kết Chất Lượng</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h5 className="font-medium text-green-800 mb-2">Sách Mới 100%</h5>
                            <p className="text-sm text-gray-600">
                                Tất cả sách đều là hàng mới, nguyên seal từ nhà xuất bản. 
                                Không bán sách cũ, sách tái bản kém chất lượng.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h5 className="font-medium text-blue-800 mb-2">Đóng Gói Cẩn Thận</h5>
                            <p className="text-sm text-gray-600">
                                Sách được đóng gói trong túi chống nước, hộp carton cứng 
                                để tránh hư hỏng trong quá trình vận chuyển.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">2. Kênh Hỗ Trợ</h4>
                    <div className="space-y-4">
                        <div className="border border-gray-200 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-800">Hotline 24/7</h5>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Ưu tiên</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">Liên hệ trực tiếp với nhân viên hỗ trợ</p>
                            <div className="text-lg font-bold text-blue-600">1900 - 1234</div>
                        </div>
                        
                        <div className="border border-gray-200 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-800 mb-2">Email Hỗ Trợ</h5>
                            <p className="text-gray-600 text-sm mb-2">Gửi câu hỏi chi tiết, nhận phản hồi trong 24h</p>
                            <div className="font-medium text-blue-600">support@bookstore.vn</div>
                        </div>

                        <div className="border border-gray-200 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-800 mb-2">Live Chat</h5>
                            <p className="text-gray-600 text-sm mb-2">Trò chuyện trực tiếp trên website (8:00 - 22:00)</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                                Bắt đầu chat
                            </button>
                        </div>

                        <div className="border border-gray-200 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-800 mb-2">Mạng Xã Hội</h5>
                            <p className="text-gray-600 text-sm mb-2">Theo dõi fanpage để cập nhật tin tức mới nhất</p>
                            <div className="flex space-x-2">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Facebook</span>
                                <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-sm">Instagram</span>
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">YouTube</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">3. Câu Hỏi Thường Gặp</h4>
                    <div className="space-y-3">
                        <div className="border border-gray-200 rounded-lg">
                            <div className="p-4 bg-gray-50 border-b border-gray-200">
                                <h5 className="font-medium text-gray-800">Làm sao để theo dõi đơn hàng?</h5>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Đăng nhập tài khoản {">"} Đơn hàng của tôi {">"} Chọn đơn hàng cần theo dõi. 
                                    Hoặc sử dụng mã theo dõi trong email xác nhận.
                                </p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg">
                            <div className="p-4 bg-gray-50 border-b border-gray-200">
                                <h5 className="font-medium text-gray-800">Tôi có thể thay đổi địa chỉ giao hàng không?</h5>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Có thể thay đổi trong vòng 2 giờ sau khi đặt hàng. 
                                    Sau thời gian này, vui lòng liên hệ hotline để được hỗ trợ.
                                </p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg">
                            <div className="p-4 bg-gray-50 border-b border-gray-200">
                                <h5 className="font-medium text-gray-800">Sách có được bảo hành không?</h5>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Sách được đổi trả miễn phí nếu có lỗi từ nhà sản xuất 
                                    (thiếu trang, lỗi in ấn) trong vòng 7 ngày.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">4. Thời Gian Phục Vụ</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h5 className="font-medium text-gray-800 mb-2">Cửa Hàng</h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Thứ 2 - Thứ 6: 8:00 - 20:00</li>
                                    <li>• Thứ 7 - Chủ nhật: 9:00 - 21:00</li>
                                    <li>• Các ngày lễ: 10:00 - 18:00</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-medium text-gray-800 mb-2">Hỗ Trợ Trực Tuyến</h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Hotline: 24/7</li>
                                    <li>• Live chat: 8:00 - 22:00</li>
                                    <li>• Email: Phản hồi trong 24h</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    };

    

    return (
      <div className="fixed left-0 top-0 w-screen h-screen">
          <div className="max-w-6xl mx-auto px-4 bg-white py-8 rounded-md h-screen overflow-y-auto">
            {/* Header */}

            <div className='text-right' onClick={dongChinhSach}>Đóng</div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Điều Khoản và Quy Định
              </h1>
              <p className="text-gray-600">
                Tìm hiểu về các chính sách và quy định của cửa hàng sách
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
              <div className="flex flex-wrap border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? `border-${tab.color}-500 text-${tab.color}-600 bg-${tab.color}-50`
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:block">{tab.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">{tabContent[activeTab]}</div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Liên Hệ Hỗ Trợ
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 text-2xl mb-2">📞</div>
                  <h4 className="font-medium text-gray-800">Hotline</h4>
                  <p className="text-blue-600 font-semibold">1900 - 1234</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-green-600 text-2xl mb-2">✉️</div>
                  <h4 className="font-medium text-gray-800">Email</h4>
                  <p className="text-green-600 font-semibold">
                    support@bookstore.vn
                  </p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-orange-600 text-2xl mb-2">📍</div>
                  <h4 className="font-medium text-gray-800">Địa Chỉ</h4>
                  <p className="text-orange-600 font-semibold">
                    123 Cách Mạng Tháng 8, Cần Thơ
                  </p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-6 text-center text-sm text-gray-500">
              Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
            </div>
          </div>
      </div>
    );
};

export default DieuKhoanVaQuyDinh;
