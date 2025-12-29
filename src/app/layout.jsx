import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Care.IO - Trusted Care Services",
  description: "Professional baby sitting, elderly care, and medical care services at your doorstep",
  keywords: "baby care, elderly care, medical care, caretaker, babysitter, home care",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <AuthProvider>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </AuthProvider>
      </body>
    </html>
  );
}
// https://docs.google.com/document/d/1huXZmMimp7AvaTjjC5dWBcOEr7Z0bo1_1junSDoUOhA/edit?tab=t.0