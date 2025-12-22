import { ArrowRight, Code2 } from "lucide-react"

export function AdvertiseSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm mb-8">
          <Code2 className="w-4 h-4" />
          <span>Khóa học Frontend chuyên nghiệp</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
          Trở thành Frontend Developer
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
