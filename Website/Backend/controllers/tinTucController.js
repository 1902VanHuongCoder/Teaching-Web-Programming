import TinTuc from "../models/TinTuc.js";

// Nhận tất cả tin tức
export const nhanTatCaTinTuc = async (req, res) => {
    try {
        const tinTucs = await TinTuc.findAll();
        res.status(200).json(tinTucs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Nhận tin tưc theo tinTucID 
export const nhanTinTucTheoID = async (req, res) => {
    const { tinTucID } = req.params;
    try {
        const tinTuc = await TinTuc.findByPk(tinTucID);
        if (!tinTuc) {
            return res.status(404).json({ message: 'Tin tức không tìm thấy' });
        }
        res.status(200).json(tinTuc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Tạo tin tức mới
export const taoTinTucMoi = async (req, res) => {
    const { tieuDe, hinhAnhTieuDe, hinhAnhNoiDung, ngayDang, noiDung } = req.body;

    console.log(req.body); 

    try {
        const tinTucMoi = await TinTuc.create({
            tieuDe,
            hinhAnhTieuDe,
            hinhAnhNoiDung: JSON.stringify(hinhAnhNoiDung), // Chuyển mảng thành chuỗi JSON
            ngayDang,
            noiDung
        });
        res.status(201).json(tinTucMoi);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Cập nhật tin tức theo tinTucID 
export const capNhatTinTucTheoID = async (req, res) => {
    const { tinTucID } = req.params;
    const { tieuDe, hinhAnhTieuDe, hinhAnhNoiDung, ngayDang, noiDung } = req.body;
    try {
        const tinTuc = await TinTuc.findByPk(tinTucID);
        if (!tinTuc) {
            return res.status(404).json({ message: 'Tin tức không tìm thấy' });
        }
        tinTuc.tieuDe = tieuDe || tinTuc.tieuDe;
        tinTuc.hinhAnhTieuDe = hinhAnhTieuDe || tinTuc.hinhAnhTieuDe;
        tinTuc.hinhAnhNoiDung = JSON.stringify(hinhAnhNoiDung) || tinTuc.hinhAnhNoiDung;
        tinTuc.ngayDang = ngayDang || tinTuc.ngayDang;
        tinTuc.noiDung = noiDung || tinTuc.noiDung;
        await tinTuc.save();
        res.status(200).json(tinTuc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 


// Xóa tin tức theo tinTucID
export const xoaTinTucTheoID = async (req, res) => {
    const { tinTucID } = req.params;
    try {
        const tinTuc = await TinTuc.findByPk(tinTucID);
        if (!tinTuc) {
            return res.status(404).json({ message: 'Tin tức không tìm thấy' });
        }
        await tinTuc.destroy();
        res.status(200).json({ message: 'Tin tức đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


