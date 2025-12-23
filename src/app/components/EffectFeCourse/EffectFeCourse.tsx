'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ParticleBackground() {
  // Fix lỗi Hydration của Next.js khi dùng Math.random()
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
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative w-full h-[400px] bg-slate-950 flex items-center justify-center overflow-hidden">
      
      {/* Container chứa các hạt */}
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

      {/* <div className="relative z-10 text-white text-3xl font-bold border border-yellow-500/30 p-8 rounded-xl backdrop-blur-sm bg-black/20 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
        <span className="text-yellow-400">Golden</span> Particles
      </div> */}
    </section>
  );
}