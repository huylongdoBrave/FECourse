import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
//   // Các trang custom (nếu bạn muốn thay giao diện mặc định của NextAuth)
//   pages: {
//     signIn: '/login', // Khi lỗi hoặc cần đăng nhập sẽ chuyển về trang này
//   }
});

export { handler as GET, handler as POST };