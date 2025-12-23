"use client"
import { Code2, Menu, X } from "lucide-react"
import Link from "next/link"
import {ThemeToggle} from "../components/Theme/theme-toggle"
import { useCallback, useState } from "react"
import LoginPopup from '../components/Auth/LoginPopup';

export function Header() {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const handleLoginClose = useCallback(() => setIsLoginOpen(false), []);

  return (
    <>  
    {/* <header className="sticky top-0 z-50 w-full border-b border-border
     bg-background/80 backdrop-blur-lg"> */}
    <header className="sticky top-0 z-50 w-full border-b border-border
      bg-linear-to-b from-white to-emerald-100 dark:from-emerald-800  dark:to-emerald-950 transition-colors">
      <div className="container mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Code2 className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-bold text-xl">Frontend Pro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="#features" className="text-sm font-medium hover:text-accent transition-colors">
              Tính năng
            </Link>
            <Link href="#curriculum" className="text-sm font-medium hover:text-accent transition-colors">
              Chương trình
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-accent transition-colors">
              Học phí
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
            onClick={() => setIsLoginOpen(true)}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors">
              Đăng nhập
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-black font-semibold transition-colors">
              Đăng ký ngay
            </button>
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top-5 fade-in duration-200">
            <nav className="flex flex-col items-center gap-4 ">
              <Link 
                href="#features" 
                className="text-sm font-medium hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tính năng
              </Link>
              <Link 
                href="#curriculum" 
                className="text-sm font-medium hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Chương trình
              </Link>
              <Link 
                href="#pricing" 
                className="text-sm font-medium hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Học phí
              </Link>
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm font-medium hover:text-accent transition-colors"
              >
                Đăng nhập
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>

    <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>
    
  )
}
