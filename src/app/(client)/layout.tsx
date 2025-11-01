// src/app/(client)/layout.tsx

// Nếu Header/Footer là client component (có "use client"), 
// file này vẫn có thể là server component – Next sẽ tự xử lý.
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export const metadata = {
  title: {
    default: "Course Management",
    template: "%s | Course Management",
  },
  description: "Course Management",
};

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Header cố định của client */}
      <Header />

      {/* Nếu Header fixed height ~82px thì padding top để tránh đè */}
      <main className="pt-[82px] min-h-dvh">
        {children}
      </main>

      <Footer />
    </>
  );
}
