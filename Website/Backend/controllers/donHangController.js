import DonHang, { DonHang_Sach } from "../models/DonHang.js";
import GiaoDichKho from "../models/GiaoDichKho.js";
import KhuyenMai from "../models/KhuyenMai.js";
import Sach from "../models/Sach.js";
import { taoGiaoDichKho } from "./giaoDichKhoController.js";

// Nhận tất cả đơn hàng
export const nhanTatCaDonHang = async (req, res) => {
  try {
    const donHangs = await DonHang.findAll({
      include: [
        {
          model: Sach,
          through: { attributes: ["soLuong", "donGia"] }, // Lấy thêm thông tin số lượng và đơn giá từ bảng trung gian
        },
      ],
    });
    res.status(200).json(donHangs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Nhận đơn hàng của một người dùng cụ thể
export const nhanDonHangCuaNguoiDung = async (req, res) => {
  try {
    const { nguoiDungID } = req.params;
    const donHangs = await DonHang.findAll({
      where: { nguoiDungID },
      include: [
        {
          model: Sach,
          through: { attributes: ["soLuong", "donGia"] }, // Lấy thêm thông tin số lượng và đơn giá từ bảng trung gian
        },
      ],
    });
    /**
     * Dư liệu trả về có dạng như sau:
     * [
     *  {
     *   donHangID: 1,
     *  nguoiDungID: 2,
     *  tenKhachHang: "Nguyen Van A",
     *  soDienThoaiKH: "0123456789",
     *  ngayDat: "2023-10-10T10:00:00.000Z",
     *  tongTien: 100000,
     *  trangThai: "Đang xử lý",
     *  diaChiGiaoHang: "123 Đường ABC, Quận 1, TP.HCM",
     *  ghiChu: "Giao hàng trong giờ hành chính",
     *  createdAt: "2023-10-10T10:00:00.000Z",
     *  updatedAt: "2023-10-10T10:00:00.000Z",
     *  Saches: [
     *    {
     *    sachID: 1,
     *   tieuDe: "Sách A",
     *  tacGia: "Tác giả A",
     *  giaGiam: 50000,
     *  images: "[{\"public_id\":\"sample\",\"url\":\"http://res.cloudinary.com/demo/image/upload/sample.jpg\"}]",
     * createdAt: "2023-10-10T10:00:00.000Z",
     * updatedAt: "2023-10-10T10:00:00.000Z",
     * DonHang_Sach: { donHangID: 1, sachID: 1, soLuong: 2, donGia: 50000 }
     * }
     *  ]
     *
     */
    res.status(200).json(donHangs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Tạo đơn hàng mới
export const taoDonHangMoi = async (req, res) => {
  try {
    const {

      nguoiDungID,
      tenKhachHang,
      soDienThoaiKH,
      ngayDat,
      tongTien,
      trangThai,
      diaChiGiaoHang,
      ghiChu,
      items, // { sachID, soLuong, donGia }


      maGiamGiaDaSuDung
    } = req.body;

    // Tạo đơn hàng mới
    const donHangMoi = await DonHang.create({
      nguoiDungID,
      tenKhachHang,
      soDienThoaiKH,
      ngayDat,
      tongTien,
      trangThai,
      diaChiGiaoHang,
      ghiChu,


      maGiamGiaDaSuDung

    });

    // Thêm các sách vào đơn hàng với số lượng và đơn giá tương ứng
    for (const item of items) {
      await DonHang_Sach.create({
        donHangID: donHangMoi.donHangID,
        sachID: item.sachID,
        soLuong: item.soLuong,
        donGia: item.donGia,
      });
    }


    // Giảm số lượng tồn kho của các sách đã bán (đã có trong items)
    for (const item of items) {
      const sach = await Sach.findByPk(item.sachID);
      if (sach) {
        sach.soLuongConLai = sach.soLuongConLai - item.soLuong;
        await sach.save();
      }
    }


    // Tạo 1 giao dịch xuất kho cho từng sản phẩm trong đơn hàng 
    for (const item of items) {
      const sach = await Sach.findByPk(item.sachID);
      if (sach) {
        const giaoDichXuatKho = {
          loaiGiaoDich: "Xuất kho",
          ngayGiaoDich: new Date(),
          tenSanPham: sach.tenSach,
          soLuong: item.soLuong,
          nguoiThucHien: "Hệ thống tự động",
          ghiChu: `Xuất kho cho đơn hàng ID: ${donHangMoi.donHangID}`,
          sachID: sach.sachID,
          giaNhap: sach.giaNhap,
          giaBan: sach.giaBan,
        };
        // Giả sử bạn đã có tên sản phẩm và người thực hiện từ các bảng khác
        const newGiaoDichKho = await GiaoDichKho.create(giaoDichXuatKho);
      }
    }

    // Nếu có áp dụng mã khuyến mãi thì phải giảm số lượng mã khuyến mãi đã sử dụng đi 1 
    if(maGiamGiaDaSuDung) {
      await KhuyenMai.increment("soLuong", {
        by: -1, // Giảm đi 1
        where: { khuyenMaiID: maGiamGiaDaSuDung },
      });
    }





    res.status(201).json(donHangMoi);
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng mới:", error);
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái đơn hàng
export const capNhatTrangThaiDonHang = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID đơn hàng từ tham số URL
    const { trangThai } = req.body; // Lấy trạng thái mới từ body yêu cầu

    // Cập nhật trạng thái đơn hàng
    
    await DonHang.update({ trangThai }, { where: { donHangID: id } });

    const donHang = await DonHang.findByPk(id); 

    // Khôi phục lại số lượng mã khuyến mãi khi hủy đơn hàng
    if (trangThai === "Đã hủy") {

      console.log(donHang);

      if (donHang && donHang.maGiamGiaDaSuDung) {
        console.log("Đơn hàng có áp dụng mã giảm giá và phải tiến hành khôi phục");
        await KhuyenMai.increment("soLuong", {
          by: 1, 
          where: { khuyenMaiID: donHang.maGiamGiaDaSuDung },
        });
      }

      // Khôi phục lại số lượng tồn kho của các sản phẩm trong đơn hàng
      const chiTietDonHangs = await DonHang_Sach.findAll({ where: { donHangID: id } });
      
      for (const chiTiet of chiTietDonHangs) {
        const sach = await Sach.findByPk(chiTiet.sachID);
        if (sach) {
          sach.soLuongConLai = sach.soLuongConLai + chiTiet.soLuong;
          await sach.save();
        }
      }
    }
    
    res
      .status(200)
      .json({ message: "Cập nhật trạng thái đơn hàng thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    res.status(500).json({ message: error.message });
  }
};

// Nhận đơn hàng theo ID
export const nhanDonHangTheoID = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID đơn hàng từ tham số URL

    const donHang = await DonHang.findByPk(id, {
      include: [
        {
          model: Sach,
          through: { attributes: ["soLuong", "donGia"] },
        },
      ],
    });

    if (!donHang) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    res.status(200).json(donHang);
  } catch (error) {
    console.error("Lỗi khi nhận đơn hàng theo ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// Xóa đơn hàng theo ID
export const xoaDonHangTheoID = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID đơn hàng từ tham số URL
    const donHang = await DonHang.findByPk(id);

    if (!donHang) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    await donHang.destroy();
    res.status(200).json({ message: "Đơn hàng đã được xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa đơn hàng theo ID:", error);
    res.status(500).json({ message: error.message });
  }
};
