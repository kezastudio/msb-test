// import type { Metadata } from "next";
// import { Raleway } from "next/font/google";
// import "./globals.css";
// import Container from "@/components/Container";
// import Navbar from "@/components/Nav";
// import Footer from "@/components/Footer";
// import { Toaster } from "@/components/ui/toaster";

// const raleway = Raleway({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "MSB || Home",
//   description: "MSB Home Page",
//   icons: { icon: "/logo.svg" },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={raleway.className}>
//         <main className="flex flex-col min-h-screen bg-secondary">
//           <Navbar />
//           <section className="flex-grow">
//             <Container>{children}</Container>
//             <Toaster />
//           </section>
//           <Footer />
//         </main>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Container from "@/components/Container";
import Navbar from "@/components/Nav";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import AppContainer from "@/components/AppContainer"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MSB || Home",
  description: "MSB Home Page",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <AppContainer> {/* Wrap with AppContainer */}
          <main className="flex flex-col min-h-screen bg-secondary">
            {/* <Navbar /> */}
            <section className="flex-grow">
              <Container>{children}</Container>
              <Toaster />
              <ToastContainer />
            </section>
            <Footer />
          </main>
        </AppContainer>
       
      </body>
    </html>
  );
}
