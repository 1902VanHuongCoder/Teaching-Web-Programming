// Generate shopping cart context to store user's cart data using Vietnamese 
import React, { createContext, useEffect, useState } from "react";
import { layGioHangTheoNguoiDung } from "../lib/gio-hang-apis";

// eslint-disable-next-line react-refresh/only-export-components
export const GioHangContext = createContext(); 

export const GioHangProvider = ({ children }) => {
  const [gioHang, setGioHang] = useState([]);

    // Nạp dữ liệu giỏ hàng từ sever sử dụng useEffect
    useEffect(() => {
      const napDuLieuGioHang = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;
  
        const data = await layGioHangTheoNguoiDung(user.nguoiDungID);
        if (data && data.success) {
            setGioHang(data.gioHang.ChiTietGioHangs || []);
          console.log("Dữ liệu giỏ hàng từ server:", data);
        }
      };
      napDuLieuGioHang();
    }, []);
  
    return (
    <GioHangContext.Provider value={{ gioHang, setGioHang }}>
      {children}
    </GioHangContext.Provider>
  );
}   
