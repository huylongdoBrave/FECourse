import { Code2, Rocket, Users, Award } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Công nghệ hiện đại",
    description:
      "Học React 19, Next.js 16, TypeScript và Tailwind CSS - những công nghệ được các công ty hàng đầu sử dụng",
  },
  {
    icon: Rocket,
    title: "Dự án thực tế",
    description: "Xây dựng 10+ dự án hoàn chỉnh từ landing page đến ứng dụng full-stack để làm portfolio",
  },
  {
    icon: Users,
    title: "Cộng đồng năng động",
    description: "Tham gia cộng đồng 500+ học viên, trao đổi kinh nghiệm và hỗ trợ lẫn nhau",
  },
  {
    icon: Award,
    title: "Chứng chỉ uy tín",
    description: "Nhận chứng chỉ hoàn thành khóa học được công nhận, tăng cơ hội việc làm",
  },
]

export function RecommendSection() {

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Tại sao chọn khóa học của chúng tôi?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chương trình được thiết kế đặc biệt để bạn có thể làm việc ngay sau khi hoàn thành
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
