import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css"
import { Toaster } from "@/components/ui/toaster";
import { IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "./provider";
import { cn } from "@/lib/utils";
import Script from "next/script";
import GoogleAnalytics from "@/analytics/GoogleAnalytics";

// const workSans = localFont({
//   src: [
//     {
//       path: "./fonts/WorkSans-Black.ttf",
//       weight: "900",
//       style: "normal"
//     },
//     {
//       path: "./fonts/WorkSans-ExtraBold.ttf",
//       weight: "800",
//       style: "normal"
//     },
//     {
//       path: "./fonts/WorkSans-Bold.ttf",
//       weight: "700",
//       style: "normal"
//     },
//     {
//       path: "./fonts/WorkSans-SemiBold.ttf",
//       weight: "600",
//       style: "normal"
//     },
//     {
//       path: "./fonts/WorkSans-Medium.ttf",
//       weight: "500",
//       style: "normal"
//     },
//     {
//       path: "./fonts/WorkSans-Regular.ttf",
//       weight: "400",
//       style: "normal"
//     },
//     {
//       path: "./fonts/WorkSans-Thin.ttf",
//       weight: "300",
//       style: "normal"
//     },
//     {
//       path: "./fonts/WorkSans-ExtraLight.ttf",
//       weight: "200",
//       style: "normal"
//     },
//     {
//       path: "./fonts/WorkSans-Light.ttf",
//       weight: "100",
//       style: "normal"
//     },
//   ],
//   variable: "--font-work-sans"
// })
const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DXR752DMTX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DXR752DMTX');
          `}
        </Script>
      </head>
      <body
        // className={`${workSans.variable}`}
        className={cn("font-IBMPlex antialiased", IBMPlex.variable)}
      >
        <GoogleAnalytics />
        {children}

        <Toaster />
      </body>
    </html>
  );
}


export const metadata: Metadata = {
  title: "CÔNG TY TNHH MTV TRUYỀN THÔNG QUẢNG CÁO COCOC STUDIO",
  description: "Cốc Cốc Studio cung cấp dịch vụ chụp hình quảng cáo cho doanh nghiệp. Đến với Cốc Cốc Studio sẽ cùng nhau thực hiện từ ý tưởng và concept để cho ra những hình ảnh đúng với yêu cầu của từng nhãn hàng nhất.",
  keywords: ["Chụp ảnh sản phẩm", "Chụp ảnh đồ ăn", "Quay video sản phẩm", "Chụp ảnh nhà máy", "Chụp ảnh nội thất", "Cho thuê phòng chụp hình theo giờ"],
  alternates: {
    canonical: 'https://cococstudio.com',
  },
  openGraph: {
    title: "Chụp ảnh, Quay phim | Cốc Cốc Studio",
    description: "Cốc Cốc Studio cung cấp dịch vụ chụp hình quảng cáo cho doanh nghiệp. Đến với Cốc Cốc Studio sẽ cùng nhau thực hiện từ ý tưởng và concept để cho ra những hình ảnh đúng với yêu cầu của từng nhãn hàng nhất.",
    url: "https://cococstudio.com/",
    images: [
      {
        url: "https://cococstudio.com/logo-cococstudio.png",
        alt: "cococ-studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@twitterhandle",
    title: "Chụp ảnh, Quay phim | Cốc Cốc Studio",
    description: "Cốc Cốc Studio cung cấp dịch vụ chụp hình quảng cáo cho doanh nghiệp. Đến với Cốc Cốc Studio sẽ cùng nhau thực hiện từ ý tưởng và concept để cho ra những hình ảnh đúng với yêu cầu của từng nhãn hàng nhất.",
    images: [
      {
        url: "https://cococstudio.com/logo-cococstudio.png",
        alt: "cococ-studio",
      },
    ],
  },
};
