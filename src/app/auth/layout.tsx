import { Inter } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/auth/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${inter.className} `}>
          <div className="flex items-center justify-center h-screen text-white bg-bgAuth">
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
