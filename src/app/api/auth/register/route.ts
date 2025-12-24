// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { users } from "../../fake-db";
import bcrypt from "bcryptjs";
import fs from "fs"; //Để lưu dữ liệu lâu dài (Persistence) giống như một database thật (kể cả khi tắt máy bật lại vẫn còn), cần tạo một file .json riêng biệt và dùng thư viện fs (File System) của Node.js để đọc/ghi nó.
import path from "path"; 

// Định nghĩa đường dẫn tới file JSON
const filePath = path.join(process.cwd(), "data", "users.json");
// Đọc dữ liệu
const getUsersFromFile = () => {
  try {
    // Nếu file chưa tồn tại thì trả về mảng rỗng
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
};
// Ghi dữ liệu vào file
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveUsersToFile = (users: any[]) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
};

export async function POST(request: Request) {
  try {
    // 1. Đọc dữ liệu gửi lên từ Frontend
    const body = await request.json();
    const { email, password, name, phone, birthday, confirmPassword } = body;

    // 2. Validate (Kiểm tra dữ liệu đầu vào)
    if (!email || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập đủ Email và Mật khẩu" },
        { status: 400 } // 400: Bad Request
      );
    }
    
    // let currentUsers = [];
    // // IF: Kiểm tra xem file users.json đã có chưa?
    // if (fs.existsSync(filePath)) {
    //   // Nếu có rồi thì đọc ra
    //   const fileData = fs.readFileSync(filePath, "utf8");
    //   currentUsers = JSON.parse(fileData);
    // } else {
    //   // IF: Nếu chưa có (ví dụ lần đầu chạy), tạo thư mục data nếu cần
    //   if (!fs.existsSync(path.join(process.cwd(), "data"))) {
    //     fs.mkdirSync(path.join(process.cwd(), "data"));
    //   }
    // }

    // Kiểm tra mật khẩu nhập lại 
    if (confirmPassword && password !== confirmPassword) {
        return NextResponse.json(
            { message: "Mật khẩu xác nhận không khớp" },
            { status: 400 }
        );
    }

    // 3. Kiểm tra xem Email đã tồn tại
    const userExist = users.find((u) => u.email === email);
    if (userExist) {
      return NextResponse.json(
        { message: "Email này đã được đăng ký rồi!" },
        { status: 409 } // 409: Conflict (Xung đột dữ liệu)
      );
    }

    // 4. Tạo user mới
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password: hashedPassword, 
      name: name || "Bạn",
      phone: phone || "",
      birthday: birthday || "",
      createdAt: new Date().toISOString()
    };

    // 5. Lưu vào kho (Push vào mảng)
    users.push(newUser);
    saveUsersToFile(users);
/* => */console.log("Danh sách User hiện tại:", users);

    // 6. Trả về thông báo thành công cho Frontend
    return NextResponse.json(
      { message: "Đăng ký thành công!", user: newUser },
      { status: 201 } // 201: Created (Đã tạo thành công)
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi hệ thống rồi" },
      { status: 500 }
    );
  }
}