import { Header } from "@/components/Header/index";
import { Footer } from "@/components/Footer/Footer";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="lg:flex w-full max-w-[86rem] mx-auto px-10 mt-16 min-h-[40vh] lg:justify-center lg:items-center">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}