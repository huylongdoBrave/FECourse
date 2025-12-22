import { Check } from "lucide-react"

const modules = [
  {
    title: "Module 1: HTML & CSS cơ bản",
    duration: "2 tuần",
    lessons: [
      "Semantic HTML và cấu trúc trang web",
      "CSS Flexbox và Grid Layout",
      "Responsive Design với Media Queries",
      "CSS Variables và Custom Properties",
    ],
  },
  {
    title: "Module 2: JavaScript hiện đại",
    duration: "3 tuần",
    lessons: ["ES6+ Syntax và Features", "Async/Await và Promises", "DOM Manipulation", "API Integration với Fetch"],
  },
  {
    title: "Module 3: React & TypeScript",
    duration: "4 tuần",
    lessons: [
      "React Components và Hooks",
      "State Management với Context API",
      "TypeScript cơ bản đến nâng cao",
      "React Router và Navigation",
    ],
  },
  {
    title: "Module 4: Next.js & Deployment",
    duration: "3 tuần",
    lessons: [
      "Next.js App Router và Server Components",
      "API Routes và Server Actions",
      "Database Integration",
      "Deploy lên Vercel",
    ],
  },
]

export function CurriculumSection() {
  return (
    <section className="py-24 px-4 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Chương trình học</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Lộ trình 12 tuần từ zero đến hero với 4 module chính
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, i) => (
            <div
              key={i}
              className="bg-background border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{module.title}</h3>
                <span className="text-sm text-accent px-3 py-1 rounded-full bg-accent/10">{module.duration}</span>
              </div>
              <ul className="space-y-3">
                {module.lessons.map((lesson, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
