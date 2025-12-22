import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Sẵn sàng bắt đầu hành trình trở thành Frontend Developer?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Đăng ký ngay hôm nay và nhận ưu đãi đặc biệt dành cho 50 học viên đầu tiên
        </p>
        <Link 
          href="/CTA"
          className="inline-flex items-center justify-center text-lg px-8 py-3 rounded-lg bg-accent hover:bg-accent/90 text-black font-semibold transition-colors"
        >
          Đăng ký học ngay
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}
