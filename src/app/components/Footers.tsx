import { Code2 } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-emerald-50 dark:bg-emerald-950 transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Code2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-xl">Frontend Pro</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Khóa học lập trình Frontend chuyên nghiệp, giúp bạn trở thành developer được săn đón trên thị trường.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Khóa học</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Chương trình học
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Học phí
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Giảng viên
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Email: hello@frontendpro.com
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Frontend Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
