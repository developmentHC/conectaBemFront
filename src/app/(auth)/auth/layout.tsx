import { Header } from "@/components/Header/index";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto mt-16 min-h-[40vh] w-full max-w-[86rem] px-10 lg:flex lg:items-center lg:justify-center">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
