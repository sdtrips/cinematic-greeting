import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "معايدة سينمائية | Cinematic Greeting",
  description: "تجربة بصرية فريدة للمناسبات — ليست مجرد كرت معايدة",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased" style={{ background: '#000', margin: 0, padding: 0, overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}