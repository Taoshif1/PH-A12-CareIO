import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-rose-500" fill="currentColor" />
              <span className="text-2xl font-bold text-white">Care.IO</span>
            </div>
            <p className="text-sm">
              Providing trusted and professional care services for your loved ones.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-rose-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-rose-500 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-rose-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-rose-500 transition">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/service/baby-care" className="hover:text-rose-500 transition">
                  Baby Care
                </Link>
              </li>
              <li>
                <Link href="/service/elderly-care" className="hover:text-rose-500 transition">
                  Elderly Care
                </Link>
              </li>
              <li>
                <Link href="/service/sick-care" className="hover:text-rose-500 transition">
                  Sick People Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-rose-500" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-rose-500" />
                <span>support@care.io</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Care.IO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}