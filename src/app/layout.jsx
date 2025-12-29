import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import Footer from "@/components/ui/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
// https://docs.google.com/document/d/1huXZmMimp7AvaTjjC5dWBcOEr7Z0bo1_1junSDoUOhA/edit?tab=t.0