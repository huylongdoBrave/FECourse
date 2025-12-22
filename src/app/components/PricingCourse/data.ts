export interface PricingPlan {
  id: number
  name: string
  price: string
  salePrice: string
  descript: string[]
}

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Gói Cơ Bản",
    price: "2.999.000đ",
    salePrice: "1.999.000đ",
    descript: ["Truy cập 3 tháng", "20+ giờ video", "3 dự án thực tế", "Hỗ trợ qua email"],
  },
  {
    id: 2,
    name: "Gói Nâng Cao",
    price: "5.999.000đ",
    salePrice: "3.999.000đ",
    descript: ["Truy cập 6 tháng", "35+ giờ video", "5 dự án thực tế", "Hỗ trợ qua chat", "Tham gia cộng đồng"],
  },
  {
    id: 3,
    name: "Gói Chuyên Sâu",
    price: "8.999.000đ",
    salePrice: "5.999.000đ",
    descript: [
      "Truy cập trọn đời",
      "50+ giờ video chất lượng cao",
      "10+ dự án thực tế",
      "Hỗ trợ 1-1 từ mentor",
      "Tham gia cộng đồng học viên",
      "Chứng chỉ hoàn thành",
    ],
  },
  {
    id: 4,
    name: "Gói Mentor",
    price: "12.999.000đ",
    salePrice: "8.999.000đ",
    descript: [
      "Truy cập trọn đời",
      "70+ giờ video",
      "15 dự án thực tế",
      "Mentor 1-1 hàng tuần",
      "Review code chi tiết",
      "Chứng chỉ + Portfolio",
      "Hỗ trợ tìm việc",
    ],
  },
  {
    id: 5,
    name: "Gói Toàn Diện",
    price: "19.999.000đ",
    salePrice: "14.999.000đ",
    descript: [
      "Truy cập trọn đời tất cả khóa",
      "100+ giờ video",
      "20+ dự án thực chiến",
      "Mentor chuyên gia 1-1",
      "Mock interview",
      "Đảm bảo việc làm",
      "Mạng lưới doanh nghiệp",
    ],
  },
  {
    id: 6,
    name: "Gói VIP",
    price: "29.999.000đ",
    salePrice: "19.999.000đ",
    descript: [
      "Gói VIP - Truy cập trọn đời",
      "150+ giờ video premium",
      "30+ dự án thực tế lớn",
      "Mentor CTO/Tech Lead",
      "Thực tập có lương",
      "Đảm bảo việc làm lương cao",
      "Hỗ trợ suốt đời",
      "Networking events",
    ],
  },
]

export const getPricingData = () => pricingPlans

export const getPlanById = (id: number) => pricingPlans.find((plan) => plan.id === id)
