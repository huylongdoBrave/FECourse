'use client';

import { X, Loader2 } from "lucide-react"; 
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void; // Thêm prop để chuyển sang đăng ký
}

// 2. Định nghĩa Schema Validation
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu"),
});

type LoginFormData = yup.InferType<typeof validationSchema>;

export default function LoginPopup({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {

  const [errorMessage, setErrorMessage] = useState("");
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });


  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage("");
    try {
      // Gọi API đăng nhập (API giả lập chúng ta đã tạo)
      const res = await axios.post('/api/auth/login', data);

      if (res.status === 200) {
        // Lưu thông tin user vào localStorage để Header hiển thị
        localStorage.setItem("user_info", JSON.stringify(res.data.user));
        alert(`Xin chào, ${res.data.user.name}!`);
        reset();
        onClose();
        
        // Reload lại trang để Header cập nhật trạng thái đăng nhập
        window.location.reload(); 
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // VD: "Sai mật khẩu"
      } else {
        setErrorMessage("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };


  // Reset form khi mở popup
  useEffect(() => {
    if (isOpen) {
        reset();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setErrorMessage("");
    }
  }, [isOpen, reset]);


  // Xử lý phím ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* 1. LỚP NỀN (Backdrop) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* 2. NỘI DUNG POPUP */}
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
        
        <div className="absolute top-4 right-4 z-20">
            <button onClick={onClose} className="p-2 rounded-full hover:bg-accent/10 transition-colors">
             <X className="w-5 h-5 text-muted-foreground" />
            </button>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-2">Xin chào.</h2>
          <p className="text-center text-muted-foreground mb-6">Đăng nhập để tiếp tục học tập</p>

          {/* Hiển thị lỗi từ API */}
          {errorMessage && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center mb-4 border border-red-200">
                {errorMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                {...register("email")}
                type="email" 
                placeholder="name@example.com"
                className={`w-full px-4 py-3 rounded-lg border bg-background outline-none transition-all
                    ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-2 focus:ring-ring'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            
            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium">Mật khẩu</label>
                <a href="#" className="text-xs text-accent hover:underline">Quên mật khẩu?</a>
              </div>
              <input 
                {...register("password")}
                type="password" 
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg border bg-background outline-none transition-all
                    ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-2 focus:ring-ring'}`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Đang đăng nhập...
                  </>
              ) : (
                  "Đăng nhập"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{" "}
            <span 
                onClick={onSwitchToRegister}
                className="text-accent font-semibold cursor-pointer hover:underline"
            >
                Đăng ký ngay
            </span>
          </div>
        </div>
      </div>
    </div>
  ); 
}