"use client"
import { Code2, Menu, X, User, LogOut, MessageCircle, Send, ArrowUp } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "../components/Theme/theme-toggle"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react";
import TypeLoginPopup from "./Auth/TypeLoginPopup"
import LoginPopup from '../components/Auth/LoginPopup';
import RegisterPopup from "./Auth/RegisterPopup";


export function Header() {
  // 1. Lấy session từ Google (NextAuth)
  const { data: session, status } = useSession();

  // 2. State lưu user từ Form đăng nhập thủ công
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [localUser, setLocalUser] = useState<any>(null);

  const [isTypeLoginOpen, setisTypeLoginOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // 3. useEffect kiểm tra LocalStorage khi tải trang
  useEffect(() => {
    // Kiểm tra xem có dữ liệu user trong máy không (do form login lưu)
    const storedUser = localStorage.getItem("user_info");
    if (storedUser) {
        try {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocalUser(JSON.parse(storedUser));
        } catch (error) {
            console.error("Lỗi parse user data", error);
        }
    }
  }, []); // Chạy 1 lần khi mount

  // 4. Xác định User hiện tại (Ưu tiên Session Google, nếu không có thì lấy Local)
  const currentUser = session?.user || localUser;
  const isAuthenticated = status === "authenticated" || !!localUser;

  // 5. Hàm xử lý Đăng xuất chung
  const handleLogout = () => {
      if (status === "authenticated") {
          // Nếu đang đăng nhập bằng Google -> Gọi hàm của NextAuth
          signOut();
      } else {
          // Nếu đang đăng nhập thủ công -> Xóa LocalStorage và reload
          localStorage.removeItem("user_info");
          setLocalUser(null);
          window.location.reload();
      }
  };

  const scrollToAdvertise = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn chặn việc đổi URL thành /#advertise
    
    // Tìm phần tử có id="advertise"
    const element = document.getElementById("advertise-sec");
    
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" // Cuộn để phần đầu section chạm đỉnh màn hình
      });
    }
  };

  // Cấu hình hiệu ứng (Variants)
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-gradient-to-b from-white to-emerald-100 dark:from-emerald-800 dark:to-emerald-950 transition-colors">
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
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <Link href="#features" className="text-sm font-medium hover:text-accent transition-colors">Tính năng</Link>
              <Link href="#curriculum" className="text-sm font-medium hover:text-accent transition-colors">Chương trình</Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-accent transition-colors">Học phí</Link>
            </nav>

            {/* Actions (Login/Register/Toggle) */}
            <div className="flex items-center gap-4">

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent/10 transition-colors"
              >
                <Menu className={`w-5 h-5 transition-all duration-300 ${isMobileMenuOpen ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
                <X className={`w-5 h-5 absolute transition-all duration-300 ${isMobileMenuOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`} />
              </button>
              
              <div className="relative">
                <ThemeToggle />
              </div>

              {/* SỬA ĐOẠN KIỂM TRA ĐĂNG NHẬP TẠI ĐÂY */}
              {isAuthenticated && currentUser ? ( 
                <div className="flex items-center gap-3">
                    
                    {/* Avatar */}
                    {currentUser.image ? (
                        <img 
                            src={currentUser.image} 
                            alt="Avatar" 
                            className="w-8 h-8 rounded-full border border-gray-300 object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                            {/* Lấy chữ cái đầu của tên để làm Avatar nếu không có ảnh */}
                            <span className="font-bold text-accent text-sm">
                                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : <User className="w-4 h-4"/>}
                            </span>
                        </div>
                    )}
                    
                    {/* Tên User */}
                    <span className="text-sm font-semibold hidden md:block">
                        {currentUser.name}
                    </span>

                    {/* Nút Đăng xuất (Gọi hàm handleLogout) */}
                    <button 
                        onClick={handleLogout} 
                        className="p-2 hover:bg-red-100 hover:text-red-600 text-gray-500 rounded-full transition-colors"
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
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={
                  {
                    closed: {
                      opacity: 0,
                      height: 0,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                        when: "afterChildren",
                      }
                    },
                    open: {
                      opacity: 1,
                      height: "auto",
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                        when: "beforeChildren",
                        staggerChildren: 0.1,
                      }
                    }
                  }
                }
                className="lg:hidden overflow-hidden border-t border-border/50"
              >
                <nav className="flex flex-col items-center gap-6 py-6">
                  {/* ... Các Link menu cũ giữ nguyên ... */}
                  <motion.div variants={itemVariants} className="w-full text-center">
                    <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-2 text-sm font-medium hover:text-accent">Tính năng</Link>
                  </motion.div>
                  <motion.div variants={itemVariants} className="w-full text-center">
                    <Link href="#curriculum" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-2 text-sm font-medium hover:text-accent">Chương trình</Link>
                  </motion.div>
                  <motion.div variants={itemVariants} className="w-full text-center">
                    <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-2 text-sm font-medium hover:text-accent">Học phí</Link>
                  </motion.div>

                  {/* 7. Nút Đăng nhập trên Mobile cũng cần kiểm tra */}
                  {!isAuthenticated && (
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
                  )}
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
             setisTypeLoginOpen(false);
             setIsLoginOpen(true);
          }}
          onLoginGoogle={() => alert("Chức năng Google đang phát triển")}
       />

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        // Thêm prop này để từ Login chuyển sang Register
        onSwitchToRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
        }}
      />

      <RegisterPopup
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
        }}
      />

      {/* === CONTACT POPUP  === */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4 sm:bottom-8 sm:right-8">
        <AnimatePresence>
          {isContactOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-2 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl dark:bg-slate-900/95 dark:backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Liên hệ hỗ trợ</h3>
                  <p className="text-xs text-muted-foreground">Chúng tôi thường phản hồi trong vài phút</p>
                </div>
                <button 
                  onClick={() => setIsContactOpen(false)}
                  className="rounded-full p-1 hover:bg-accent/10 transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email của bạn</label>
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tin nhắn</label>
                  <textarea 
                    placeholder="Bạn cần hỗ trợ gì?" 
                    rows={3}
                    className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  />
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90">
                  <Send className="h-4 w-4" />
                  Gửi tin nhắn
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToAdvertise}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border shadow-lg transition-all hover:scale-110 hover:border-accent hover:text-accent active:scale-95"
        >
          <ArrowUp className="h-5 w-5" />
        </button>

        {/* Toggle Button */}
        <button
          onClick={() => setIsContactOpen(!isContactOpen)}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95"
        >
          <div className="relative">
            <MessageCircle className={`h-6 w-6 transition-all duration-300 ${isContactOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} />
            <X className={`absolute top-0 left-0 h-6 w-6 transition-all duration-300 ${isContactOpen ? 'scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
          </div>
        </button>
      </div>
      {/* === END CONTACT POPUP === */}

    </>
  )
}