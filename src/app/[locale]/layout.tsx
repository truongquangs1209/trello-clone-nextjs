import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import "../../firebase/config";
import "tippy.js/dist/tippy.css";
import AuthProvider from "@/context/AppProvider";
import { ToastContainer } from "react-toastify";
import WorkspaceProvider from "@/context/WorkspaceProvider";
import BoardsProvider from "@/context/BoardsProvider";
import ListJobsProvider from "@/context/ListJobsProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  params:{
    locale:string
  }
}

export const metadata: Metadata = {
  title: "Trello App",
  description: "Generated by create next app",
};

export default function RootLayout({ children,params:{locale} ,}: Readonly<RootLayoutProps>) {
  // Sử dụng hook useMessages để lấy dữ liệu dịch
  const messages = useMessages();


  return (
    <BoardsProvider>
      <AuthProvider>
        <WorkspaceProvider>
          <ListJobsProvider>
            <html lang={locale}>
              <body className={inter.className}>
                {/* Truyền locale từ props vào NextIntlClientProvider */}
                <NextIntlClientProvider locale={locale} messages={messages}>
                  {children} 
                  <ToastContainer />
                </NextIntlClientProvider>
              </body>
            </html>
          </ListJobsProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </BoardsProvider>
  );
}