'use client';

import { X, Loader2 } from "lucide-react"; 
import { useEffect, useState } from "react";
import axios from "axios"; 
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Vui lòng nhập họ và tên")
    .matches(/^[^0-9]+$/, "Họ và tên không được chứa số.")
    .min(4, "Họ và tên phải có nhiều hơn 3 ký tự."),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^\d{10}$/, "Số điện thoại phải có đúng 10 chữ số, không nhập chữ."),
  birthday: yup
    .string()
    .required("Vui lòng nhập ngày sinh")
    .test("is-over-four", "Bạn phải lớn hơn 4 tuổi.", (value) => {
      if (!value) return false;
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age >= 4;
    }),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Mật khẩu không khớp.")
    .required("Vui lòng xác nhận mật khẩu"),
});

// Kiểu dữ liệu form (Infer từ schema)
type RegisterFormData = yup.InferType<typeof validationSchema>;

export default function RegisterPopup({ 
                          isOpen, 
                          onClose,
                          onSwitchToLogin }: RegisterModalProps) {
  
  const [errorMessage, setErrorMessage] = useState(""); 

  const { register, handleSubmit, reset,
    formState: { errors, isSubmitting } // isSubmitting tự động = true khi đang chạy hàm onSubmit
  } = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthday: "",
      password: "",
      confirmPassword: ""
    }
  });


  const onSubmit = async (data: RegisterFormData) => {
    setErrorMessage("");
    try {
      const responeApi =  await axios.post('/api/auth/register', data);
      if (responeApi.status === 201) {
          // Lưu thông tin user (không lưu pass) vào trình duyệt
          localStorage.setItem("user_info", JSON.stringify(responeApi.data.user));
          alert("Đăng ký thành công!");
          reset(); // Xóa sạch form
      }
      if (onSwitchToLogin) onSwitchToLogin();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };


  // Reset form mỗi khi mở popup
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
      {/* LỚP NỀN */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* POPUP CONTENT */}
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        
        <div className="absolute top-4 right-4 z-20">
            <button onClick={onClose} type="button" className="p-2 rounded-full hover:bg-accent/10 transition-colors">
             <X className="w-5 h-5 text-muted-foreground" />
            </button>
        </div>

        <div className="p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Tạo tài khoản mới</h2>
          <p className="text-center text-muted-foreground mb-6">Điền thông tin để tham gia cộng đồng</p>

          {errorMessage && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center mb-4 border border-red-200">
                {errorMessage}
            </div>
          )}

          {/* Form dùng handleSubmit */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Họ và tên */}
            <div>
              <label className="block text-sm font-medium mb-1">Họ và tên</label>
              <input 
                {...register("name")} // Thay thế value/onChange bằng register
                type="text" 
                placeholder="Nguyễn Văn A"
                className={`w-full px-4 py-3 rounded-lg border bg-background outline-none transition-all
                    ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-2 focus:ring-ring'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                    <input 
                        {...register("phone")}
                        type="tel" 
                        placeholder="098..."
                        className={`w-full px-4 py-3 rounded-lg border bg-background outline-none transition-all
                            ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-2 focus:ring-ring'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                    <input 
                        {...register("birthday")}
                        type="date" 
                        className={`w-full px-4 py-3 rounded-lg border bg-background outline-none transition-all
                            ${errors.birthday ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-2 focus:ring-ring'}`}
                    />
                    {errors.birthday && <p className="text-red-500 text-xs mt-1">{errors.birthday.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                    <input 
                        {...register("password")}
                        type="password" 
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 rounded-lg border bg-background outline-none transition-all
                            ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-2 focus:ring-ring'}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
                    <input 
                        {...register("confirmPassword")}
                        type="password" 
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 rounded-lg border bg-background outline-none transition-all
                            ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-2 focus:ring-ring'}`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
            </div>

            <button 
                type="submit" // Phải là submit
                disabled={isSubmitting} // Dùng isSubmitting của hook form
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Đang xử lý...
                  </>
              ) : (
                  "Đăng ký tài khoản"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <span 
                onClick={onSwitchToLogin}
                className="text-accent font-semibold cursor-pointer hover:underline"
            >
                Đăng nhập ngay
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}