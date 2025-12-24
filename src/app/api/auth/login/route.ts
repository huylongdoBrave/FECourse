import { NextResponse } from "next/server";
import { users } from "../../fake-db";
import bcrypt from "bcryptjs"; // Import bcrypt

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body; // password này là "123456" người dùng nhập

    // 1. Tìm user theo email trước
    const user = users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json({ message: "Email không tồn tại" }, { status: 401 });
    }

    // 2. So sánh mật khẩu nhập vào với mật khẩu mã hóa trong kho
    // password: Mật khẩu nhập (plain text)
    // user.password: Mật khẩu trong kho (hashed)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Mật khẩu không đúng" }, { status: 401 });
    }

    // 3. Nếu đúng thì trả về info (bỏ pass ra)
    const { password: _, ...userWithoutPass } = user;

    return NextResponse.json(
      { message: "Đăng nhập thành công", user: userWithoutPass },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json({ message: "Lỗi hệ thống" }, { status: 500 });
  }
}