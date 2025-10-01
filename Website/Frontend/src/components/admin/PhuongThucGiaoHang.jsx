import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaEye, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import {
    layTatCaPhuongThucGiaoHang,
    taoPhuongThucGiaoHang,
    capNhatPhuongThucGiaoHang,
    xoaPhuongThucGiaoHang,
    kichHoatPhuongThucGiaoHang
} from '../../lib/phuong-thuc-giao-hang-apis';

/**
 * Component quản lý phương thức giao hàng
 * Cho phép admin thêm, sửa, xóa và quản lý các phương thức giao hàng
 */
const PhuongThucGiaoHang = () => {
    // State quản lý danh sách phương thức giao hàng
    const [phuongThucGiaoHangs, setPhuongThucGiaoHangs] = useState([]);
    
    // State quản lý loading và lỗi
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    // State quản lý modal thêm/sửa
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    
    // State quản lý form data
    const [formData, setFormData] = useState({
        tenPhuongThuc: '',
        phiGiaoHang: '',
        thoiGianGiaoHang: '',
        trangThai: 'active',
        macDinh: false
    });

    // State quản lý bộ lọc và tìm kiếm
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    /**
     * Tải danh sách phương thức giao hàng từ API
     */
    const loadPhuongThucGiaoHangs = async () => {
        try {
            setLoading(true);
            const response = await layTatCaPhuongThucGiaoHang();
            if (response.success) {
                setPhuongThucGiaoHangs(response.data);
                setError('');
            } else {
                setError('Không thể tải danh sách phương thức giao hàng');
            }
        } catch (err) {
            console.error('Lỗi khi tải phương thức giao hàng:', err);
            setError('Có lỗi xảy ra khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Hook effect để tải dữ liệu khi component mount
     */
    useEffect(() => {
        loadPhuongThucGiaoHangs();
    }, []);

    /**
     * Xử lý thay đổi giá trị trong form
     */
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({  // previous state
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    /**
     * Reset form về trạng thái ban đầu
     */
    const resetForm = () => {
        setFormData({
            tenPhuongThuc: '',
            phiGiaoHang: '',
            thoiGianGiaoHang: '',
            trangThai: 'active',
            macDinh: false
        });
        setEditingItem(null);
    };

    /**
     * Mở modal để thêm phương thức giao hàng mới
     */
    const handleAdd = () => {
        resetForm(); 
        setShowModal(true); 
    };

    /**
     * Mở modal để chỉnh sửa phương thức giao hàng
     */
    const handleEdit = (item) => {
        setFormData({
            tenPhuongThuc: item.tenPhuongThuc,
            phiGiaoHang: item.phiGiaoHang.toString(),
            thoiGianGiaoHang: item.thoiGianGiaoHang,
            trangThai: item.trangThai,
            macDinh: item.macDinh
        });
        setEditingItem(item);
        setShowModal(true);
    };

    /**
     * Đóng modal và reset form
     */
    const handleCancel = () => {
        setShowModal(false);
        resetForm();
    };

    /**
     * Xử lý submit form (thêm hoặc cập nhật)
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate dữ liệu
        if (!formData.tenPhuongThuc.trim()) {
            setError('Vui lòng nhập tên phương thức giao hàng');
            return;
        }
        
        if (!formData.phiGiaoHang || formData.phiGiaoHang < 0) {
            setError('Vui lòng nhập phí giao hàng hợp lệ');
            return;
        }

        if (!formData.thoiGianGiaoHang.trim()) {
            setError('Vui lòng nhập thời gian giao hàng');
            return;
        }

        try {
            setLoading(true);
            let response;
            
            if (editingItem) {
                // Cập nhật phương thức giao hàng
                response = await capNhatPhuongThucGiaoHang(editingItem.phuongThucGiaoHangID, formData);
            } else {
                // Thêm phương thức giao hàng mới
                response = await taoPhuongThucGiaoHang(formData);
            }

            if (response.success) {
                setSuccessMessage(
                    editingItem 
                        ? 'Cập nhật phương thức giao hàng thành công!' 
                        : 'Thêm phương thức giao hàng thành công!'
                );
                setShowModal(false);
                resetForm();
                await loadPhuongThucGiaoHangs(); // Tải lại danh sách
                setError('');
                
                // Ẩn thông báo thành công sau 3 giây
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                setError(response.message || 'Có lỗi xảy ra');
            }
        } catch (err) {
            console.error('Lỗi khi lưu phương thức giao hàng:', err);
            setError('Có lỗi xảy ra khi lưu dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Xử lý xóa phương thức giao hàng (soft delete)
     */
    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa phương thức giao hàng này?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await xoaPhuongThucGiaoHang(id);
            
            if (response.success) {
                setSuccessMessage('Xóa phương thức giao hàng thành công!');
                await loadPhuongThucGiaoHangs();
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                setError(response.message || 'Có lỗi xảy ra khi xóa');
            }
        } catch (err) {
            console.error('Lỗi khi xóa phương thức giao hàng:', err);
            setError('Có lỗi xảy ra khi xóa dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Xử lý kích hoạt/vô hiệu hóa phương thức giao hàng
     */
    const handleToggleStatus = async (item) => {
        try {
            setLoading(true);
            let response;
            
            if (item.trangThai === 'active') {
                // Vô hiệu hóa
                response = await xoaPhuongThucGiaoHang(item.phuongThucGiaoHangID);
            } else {
                // Kích hoạt lại
                response = await kichHoatPhuongThucGiaoHang(item.phuongThucGiaoHangID);
            }

            if (response.success) {
                setSuccessMessage(
                    item.trangThai === 'active' 
                        ? 'Đã vô hiệu hóa phương thức giao hàng!' 
                        : 'Đã kích hoạt phương thức giao hàng!'
                );
                await loadPhuongThucGiaoHangs();
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                setError(response.message || 'Có lỗi xảy ra');
            }
        } catch (err) {
            console.error('Lỗi khi thay đổi trạng thái:', err);
            setError('Có lỗi xảy ra khi thay đổi trạng thái');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Lọc danh sách phương thức giao hàng theo từ khóa tìm kiếm và trạng thái
     */
    const filteredPhuongThucGiaoHangs = phuongThucGiaoHangs.filter(item => {
        const matchesSearch =
          item.tenPhuongThuc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.thoiGianGiaoHang
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        // Nhập "abc", tên phương thức = "Phương thức abc", thì khi sử dụng hàm includes. 
        // ("Phương thức abc").includes("abc");  => true 
        // Nhập "abc", thời gian giao hàng = "2 ngày", thì khi sử dụng hàm includes. 
        // ("2 ngày").includes("abc");  => false 

        const matchesStatus = statusFilter === 'all' || item.trangThai === statusFilter;
        return matchesSearch && matchesStatus;
    });

    /**
     * Định dạng tiền tệ VND
     */
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Quản Lý Phương Thức Giao Hàng</h1>
                    <p className="text-gray-600 mt-1">Quản lý các phương thức giao hàng của cửa hàng</p>
                </div>
                <button
                    onClick={handleAdd} // Chạy hàm handleAdd để xử lý thêm 1 phương thức giao hàng mới 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    disabled={loading}
                >
                    <FaPlus />
                    <span>Thêm Phương Thức</span>
                </button>
            </div>

            {/* Thông báo lỗi */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error} 
                </div>
            )}

            {/* Thông báo thành công */}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMessage}
                </div>
            )}

            {/* Bộ lọc và tìm kiếm */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    {/* Tìm kiếm */}
                    <div className="flex-1 md:mr-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên phương thức hoặc thời gian giao hàng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Bộ lọc trạng thái */}
                    <div className="flex items-center space-x-4">
                        <label className="text-sm font-medium text-gray-700">Trạng thái:</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">Tất cả</option>
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Đã vô hiệu hóa</option>
                        </select>
                    </div>
                </div>
            </div>



            {/* Bảng danh sách phương thức giao hàng */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-2">Đang tải...</span>
                    </div>
                ) : filteredPhuongThucGiaoHangs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        Không có phương thức giao hàng nào
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tên Phương Thức
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phí Giao Hàng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thời Gian
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng Thái
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mặc Định
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao Tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredPhuongThucGiaoHangs.map((item) => (
                                    <tr key={item.phuongThucGiaoHangID} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {item.tenPhuongThuc}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {formatCurrency(item.phiGiaoHang)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {item.thoiGianGiaoHang}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                item.trangThai === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {item.trangThai === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.macDinh ? (
                                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    Mặc định
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                {/* Nút chỉnh sửa */}
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                    title="Chỉnh sửa"
                                                >
                                                    <FaEdit />
                                                </button>

                                                {/* Nút bật/tắt trạng thái */}
                                                <button
                                                    onClick={() => handleToggleStatus(item)}
                                                    className={`p-1 rounded ${
                                                        item.trangThai === 'active'
                                                            ? 'text-red-600 hover:text-red-900'
                                                            : 'text-green-600 hover:text-green-900'
                                                    }`}
                                                    title={item.trangThai === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                                                >
                                                    {item.trangThai === 'active' ? <FaToggleOn /> : <FaToggleOff />}
                                                </button>

                                                {/* Nút xóa */}
                                                <button
                                                    onClick={() => handleDelete(item.phuongThucGiaoHangID)}
                                                    className="text-red-600 hover:text-red-900 p-1 rounded"
                                                    title="Xóa"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal thêm/sửa phương thức giao hàng */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h2 className="text-lg font-semibold mb-4">
                            {editingItem ? 'Chỉnh Sửa Phương Thức Giao Hàng' : 'Thêm Phương Thức Giao Hàng Mới'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Tên phương thức */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên Phương Thức <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="tenPhuongThuc"
                                    value={formData.tenPhuongThuc}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ví dụ: Giao hàng nhanh, Giao hàng tiêu chuẩn..."
                                    required
                                />
                            </div>

                            {/* Phí giao hàng */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phí Giao Hàng (VND) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="phiGiaoHang"
                                    value={formData.phiGiaoHang}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="0"
                                    min="0"
                                    step="1000"
                                    required
                                />
                            </div>

                            {/* Thời gian giao hàng */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thời Gian Giao Hàng <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="thoiGianGiaoHang"
                                    value={formData.thoiGianGiaoHang}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ví dụ: 1-2 ngày, 3-5 ngày làm việc..."
                                    required
                                />
                            </div>

                            {/* Trạng thái */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Trạng Thái
                                </label>
                                <select
                                    name="trangThai"
                                    value={formData.trangThai}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Vô hiệu hóa</option>
                                </select>
                            </div>

                            {/* Mặc định */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="macDinh"
                                    checked={formData.macDinh}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 text-sm text-gray-700">
                                    Đặt làm phương thức mặc định
                                </label>
                            </div>

                            {/* Nút hành động */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Đang lưu...' : (editingItem ? 'Cập nhật' : 'Thêm mới')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Footer thống kê */}
            <div className="mt-6 text-sm text-gray-600">
                Tổng cộng: {filteredPhuongThucGiaoHangs.length} phương thức giao hàng
                {searchTerm && (
                    <span> (lọc từ {phuongThucGiaoHangs.length} phương thức)</span>
                )}
            </div>
        </div>
    );
};

export default PhuongThucGiaoHang;
