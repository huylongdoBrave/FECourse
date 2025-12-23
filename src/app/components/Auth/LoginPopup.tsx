'use client';

import { X } from "lucide-react"; 
import { useEffect } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  // Logic: Nếu chưa mở thì không render gì cả

  // Bấm phím ESC để tắt popup
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") 
        onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);


  if (!isOpen) return null;

  return (
    // 1. Lớp nền đen mờ che phủ toàn màn hình (Overlay)
    <div
    className=" fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      {/* 2. Cái hộp Popup chính */}
      <div 
        className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()} // Chặn click xuyên thấu
      >
        
        {/* Nút tắt X */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Nội dung Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-2">Xin chào.</h2>
          <p className="text-center text-gray-500 mb-6">Đăng nhập để tiếp tục học tập</p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
              Đăng nhập
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Chưa có tài khoản? <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Đăng ký ngay</span>
          </div>
        </div>
      </div>

      {/* Lớp click ra ngoài để tắt (đặt sau cùng nhưng z-index thấp hơn hộp popup) */}
      {/* <div className="absolute inset-0" onClick={onClose}></div> */}

    </div>
  );
}