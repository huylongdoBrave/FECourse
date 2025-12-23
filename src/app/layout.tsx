import type { Metadata } from 'next'
import { ThemeProvider } from './components/Theme/theme-provider'  

// import { Analytics } from '@vercel/analytics/Next'
import './globals.css'
// import { DM_Sans as V0_Font_DM_Sans, Roboto_Mono as V0_Font_Roboto_Mono, Slabo_27px as V0_Font_Slabo_27px } from 'next/font/google'
import { Be_Vietnam_Pro } from 'next/font/google'

// Initialize fonts
// const _dmSans = V0_Font_DM_Sans({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900","1000"] })
// const _robotoMono = V0_Font_Roboto_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
// const _slabo_27px = V0_Font_Slabo_27px({ subsets: ['latin'], weight: ["400"] })

const fontMain = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-main', // Đặt tên biến CSS để dùng bên globals.css
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Frontend Course HL',
  description: 'Created by LongD',
  generator: 'LongD',
}

export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode
    }>) 
  {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${fontMain.variable} font-sans antialiased`}>
          <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          value={{
            light: "light",
            dark: "dark",
          }}
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    )
  }
