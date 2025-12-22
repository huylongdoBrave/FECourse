"use client"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { getPricingData, PricingPlan } from "./data"

// interface PricingPlan {
//   price: string
//   salePrice: string
//   descript: string[]
// }

// function getMockPricingData(): PricingPlan[] {
//   return [
//     {
//       price: "2.999.000đ",
//       salePrice: "1.999.000đ",
//       descript: ["Truy cập 3 tháng", "20+ giờ video", "3 dự án thực tế", "Hỗ trợ qua email"],
//     },
//     {
//       price: "5.999.000đ",
//       salePrice: "3.999.000đ",
//       descript: ["Truy cập 6 tháng", "35+ giờ video", "5 dự án thực tế", "Hỗ trợ qua chat", "Tham gia cộng đồng"],
//     },
//     {
//       price: "8.999.000đ",
//       salePrice: "5.999.000đ",
//       descript: [
//         "Truy cập trọn đời",
//         "50+ giờ video chất lượng cao",
//         "10+ dự án thực tế",
//         "Hỗ trợ 1-1 từ mentor",
//         "Tham gia cộng đồng học viên",
//         "Chứng chỉ hoàn thành",
//       ],
//     },
//     {
//       price: "12.999.000đ",
//       salePrice: "8.999.000đ",
//       descript: [
//         "Truy cập trọn đời",
//         "70+ giờ video",
//         "15 dự án thực tế",
//         "Mentor 1-1 hàng tuần",
//         "Review code chi tiết",
//         "Chứng chỉ + Portfolio",
//         "Hỗ trợ tìm việc",
//       ],
//     },
//     {
//       price: "19.999.000đ",
//       salePrice: "14.999.000đ",
//       descript: [
//         "Truy cập trọn đời tất cả khóa",
//         "100+ giờ video",
//         "20+ dự án thực chiến",
//         "Mentor chuyên gia 1-1",
//         "Mock interview",
//         "Đảm bảo việc làm",
//         "Mạng lưới doanh nghiệp",
//       ],
//     },
//     {
//       price: "29.999.000đ",
//       salePrice: "19.999.000đ",
//       descript: [
//         "Gói VIP - Truy cập trọn đời",
//         "150+ giờ video premium",
//         "30+ dự án thực tế lớn",
//         "Mentor CTO/Tech Lead",
//         "Thực tập có lương",
//         "Đảm bảo việc làm lương cao",
//         "Hỗ trợ suốt đời",
//         "Networking events",
//       ],
//     },
//   ]
// }

export function PricingSection() {
  const pricingPlans = getPricingData()
  const router = useRouter()

  const handleSelectPlan = (plan: PricingPlan) => {
    //     const params = new URLSearchParams({
    //   price: plan.price,
    //   salePrice: plan.salePrice,
    //   descript: plan.descript.join(","),
    // })
    // router.push(`/PricingCourse/Pricing?${params.toString()}`)
    router.push(`/PricingCourse/Pricing?id=${plan.id}`)
  }

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Học phí ưu đãi</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Đầu tư cho tương lai của bạn với mức giá hợp lý nhất
          </p>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              // Sửa button cho nằm dưới đáy className="bg-card border-2 border-border hover:border-accent rounded-2xl p-6 relative transition-all hover:shadow-lg hover:scale-105"
              className="bg-card border-2 border-border hover:border-accent rounded-2xl p-6 relative flex flex-col transition-all hover:shadow-lg hover:scale-105"
            >
              {/* {index === 2 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Phổ biến nhất
                </div>
              )} */}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <div className="text-3xl font-bold mb-2">{plan.salePrice}</div>
                <div className="text-muted-foreground line-through text-sm">{plan.price}</div>
                <div className="text-accent font-semibold mt-1 text-sm">
                  Tiết kiệm{" "}
                  {Number.parseInt(plan.price.replace(/\D/g, "")) - Number.parseInt(plan.salePrice.replace(/\D/g, ""))}đ
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.descript.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                //  Sửa button cho nằm dưới đáy className="top-0 w-full bg-accent hover:bg-accent/90 text-black font-semibold py-2.5 rounded-lg transition-colors"
                className="w-full bg-accent hover:bg-accent/90 text-black font-semibold py-2.5 rounded-lg transition-colors mt-auto"
              >
                Đăng ký ngay
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Hoàn tiền 100% trong 30 ngày nếu không hài lòng
        </p>
      </div>
    </section>
  )
}
