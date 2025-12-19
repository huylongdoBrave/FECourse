import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // 1. Bỏ qua lỗi TypeScript
  typescript: {
    // !! CẢNH BÁO !!
    // Nguy hiểm: Cho phép build thành công ngay cả khi project có lỗi Type
    ignoreBuildErrors: true,
  },
  
  
};

export default nextConfig;
