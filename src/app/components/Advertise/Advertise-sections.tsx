'use client';
import { ArrowRight, Code2 } from "lucide-react"
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AdvertiseSection() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    // Chỉ tạo hạt sau khi component đã mount trên client
    const newParticles = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100, // Đổi sang % cho full màn hình
      y: Math.random() * 100, // Đổi sang %
      size: Math.random() * 15 + 5, // Kích thước từ 5px đến 20px
      duration: Math.random() * 5 + 5,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">

      <div className="absolute inset-0 z-0">
        {particles.map((particle, i) => (
          <motion.span
            key={i}
            // Đổi bg-white thành bg-yellow-400
            className="absolute bg-yellow-400 rounded-full"
            initial={{
              left: `${particle.x}%`, // Dùng % để rải đều theo chiều ngang
              top: `${particle.y}%`,  // Dùng % để rải đều theo chiều dọc
              scale: 0,
            }}
            animate={{
              y: [0, -100], // Bay lên 100px so với vị trí ban đầu
              opacity: [0, 0.8, 0], // Sáng rõ hơn (lên 0.8) rồi tắt dần
              scale: [0, 1, 0.5],   // Hiệu ứng phình to ra rồi nhỏ lại
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              // eslint-disable-next-line react-hooks/purity
              delay: Math.random() * 5, // Delay để các hạt không xuất hiện cùng lúc
            }}
            style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                // Thêm bóng sáng màu vàng (box-shadow)
                // rgba(250, 204, 21, 0.6) là mã màu của yellow-400 có độ trong suốt
                boxShadow: `0 0 ${particle.size * 2}px 2px rgba(250, 204, 21, 0.6)` 
            }}
          />
        ))}
      </div>

      {/* Background grid effect */}
      <div 
        className="
          absolute inset-0 
          -z-10 h-full w-full 
          bg-[size:4rem_4rem]
          /* 1. Định nghĩa màu cho biến --line-color */
          /* Light Mode: Dùng màu xám cực nhạt (#e5e7eb - gray-200) */
          [--line-color:#e5e7eb] 
          /* Dark Mode: Dùng lại màu tối cũ (#1a1a1a) hoặc dùng màu trắng mờ (rgba(255,255,255,0.05)) */
          dark:[--line-color:#1a1a1a]
          /* 2. Áp dụng biến vào Gradient */
          bg-[linear-gradient(to_right,var(--line-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--line-color)_1px,transparent_1px)]
          /* 3. Mask giữ nguyên */
          [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]
        " 
      />
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm mb-8">
          <Code2 className="w-4 h-4" />
          <span>Khóa học Frontend chuyên nghiệp</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
          Chương trình đào tạo lập trình viên Front end
          <br />
          <span className="text-accent">chuyên nghiệp</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty">
          Học React, Next.js, TypeScript và Tailwind CSS từ cơ bản đến nâng cao. Xây dựng portfolio ấn tượng và sẵn sàng
          cho công việc thực tế.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center justify-center text-lg px-8 py-3 rounded-lg bg-accent hover:bg-accent/90 text-black font-semibold transition-colors">
            Đăng ký ngay
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <button className="inline-flex items-center justify-center text-lg px-8 py-3 rounded-lg bg-transparent border-2 border-border hover:bg-accent/10 transition-colors">
            Xem chương trình học
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "500+", label: "Học viên" },
            { number: "50+", label: "Bài giảng" },
            { number: "10+", label: "Dự án thực tế" },
            { number: "100%", label: "Hỗ trợ trọn đời" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">{stat.number}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
