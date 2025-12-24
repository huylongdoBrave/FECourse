"use client"
import { Code2, Menu, X, User, LogOut} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "../components/Theme/theme-toggle"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"; 
import TypeLoginPopup from "./Auth/TypeLoginPopup"
import LoginPopup from '../components/Auth/LoginPopup';
import RegisterPopup from "./Auth/RegisterPopup";


export function Header() {
  // Lấy dữ liệu session
  // data: chứa thông tin user (name, email, image)
  // status: trạng thái ('authenticated', 'loading', 'unauthenticated')
  const { data: session, status } = useSession();

  const [isTypeLoginOpen, setisTypeLoginOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lưu Local
  useEffect(() => {
    if (session?.user) {
        localStorage.setItem("user_info", JSON.stringify(session.user));
    }
  }, [session]);

  // Cấu hình hiệu ứng (Variants)
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren", // Đợi con đóng xong mới đóng cha
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren", // Mở cha xong mới mở con
        staggerChildren: 0.1,   // Quan trọng: Mỗi con hiện cách nhau 0.1s
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 }, // Trạng thái ẩn: mờ và lệch sang trái
    open: { opacity: 1, x: 0 }      // Trạng thái hiện: rõ và về vị trí cũ
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-linear-to-b from-white to-emerald-100 dark:from-emerald-800 dark:to-emerald-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="relative flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Code2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-xl">Frontend Pro</span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <Link href="#features" className="text-sm font-medium hover:text-accent transition-colors">Tính năng</Link>
              <Link href="#curriculum" className="text-sm font-medium hover:text-accent transition-colors">Chương trình</Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-accent transition-colors">Học phí</Link>
            </nav>

            {/* Actions (Login/Register/Toggle) */}
            <div className="flex items-center gap-4">

              {/* KIỂM TRA: Nếu đã đăng nhập (session tồn tại) */}
              {status === "authenticated" && session.user ? ( 
                <div className="flex items-center gap-3">
                    {/* Hiển thị Avatar (nếu có) hoặc Icon User */}
                    {session.user.image ? (
                        <img 
                            src={session.user.image} 
                            alt="Avatar" 
                            className="w-8 h-8 rounded-full border border-gray-300"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600"/>
                        </div>
                    )}
                    
                    {/* Hiển thị Tên */}
                    <span className="text-sm font-semibold hidden md:block">
                        {session.user.name}
                    </span>

                    {/* Nút Đăng xuất */}
                    <button 
                        onClick={() => signOut()} // Hàm đăng xuất của NextAuth
                        className="p-2 hover:text-green-600 text-white-500 rounded-full transition-colors"
                        title="Đăng xuất"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setisTypeLoginOpen(true)}
                    className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors">
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="inline-flex items-center justify-center px-3 py-1.5 text-sm lg:px-4 lg:py-2 lg:text-base rounded-lg bg-accent hover:bg-accent/90 text-black font-semibold transition-colors">
                    Đăng ký ngay
                  </button>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent/10 transition-colors"
              >
                <Menu className={`w-5 h-5 transition-all duration-300 ${isMobileMenuOpen ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
                <X className={`w-5 h-5 absolute transition-all duration-300 ${isMobileMenuOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`} />
              </button>
              
              <div className="relative">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile Menu với Framer Motion */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  closed: {
                    opacity: 0,
                    height: 0,
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                      when: "afterChildren", // Đợi con đóng xong mới đóng cha
                    }
                  },
                  open: {
                    opacity: 1,
                    height: "auto",
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                      when: "beforeChildren", // Mở cha xong mới mở con
                      staggerChildren: 0.1,   // Quan trọng: Mỗi con hiện cách nhau 0.1s
                    }
                  }
                }}
                className="md:hidden overflow-hidden border-t border-border/50" // overflow-hidden quan trọng để animation height mượt
              >
                <nav className="flex flex-col items-center gap-6 py-6">
                  {/* Item 1 */}
                  <motion.div variants={itemVariants} className="w-full text-center">
                    <Link
                      href="#features"
                      className="block w-full py-2 text-sm font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Tính năng
                    </Link>
                  </motion.div>

                  {/* Item 2 */}
                  <motion.div variants={itemVariants} className="w-full text-center">
                    <Link
                      href="#curriculum"
                      className="block w-full py-2 text-sm font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Chương trình
                    </Link>
                  </motion.div>

                  {/* Item 3 */}
                  <motion.div variants={itemVariants} className="w-full text-center">
                    <Link
                      href="#pricing"
                      className="block w-full py-2 text-sm font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Học phí
                    </Link>
                  </motion.div>

                  {/* Item 4 (Login Button Mobile) */}
                  <motion.div variants={itemVariants} className="w-full text-center">
                    <button
                      onClick={ () => {
                        setisTypeLoginOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-sm font-medium hover:text-accent transition-colors"
                    >
                      Đăng nhập
                    </button>
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <TypeLoginPopup 
          isOpen={isTypeLoginOpen}
          onClose={() => setisTypeLoginOpen(false)}
          onSwitchToLoginForm={() => {
             setisTypeLoginOpen(false); // Đóng chọn loại
             setIsLoginOpen(true);      // Mở form nhập
          }}
          onLoginGoogle={() => alert("Chức năng Google đang phát triển")}
       />

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <RegisterPopup
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
        }}
      />


    </>
  )
}