'use client';

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="w-8 h-8 text-rose-500" fill="currentColor" />
          <span className="text-2xl font-bold text-primary">Care.IO</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#services">Services</Link></li>
          <li><Link href="/#about">About</Link></li>
          {user && (
            <li><Link href="/my-bookings">My Bookings</Link></li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm hidden md:inline">Hi, {user.name}</span>
            <button onClick={logout} className="btn btn-outline btn-error btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </div>
        )}

        {/* Mobile menu button */}
        <div className="lg:hidden ml-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-square btn-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-base-100 shadow-lg z-40">
          <ul className="menu menu-vertical w-full p-4">
            <li><Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link href="/#services" onClick={() => setMobileMenuOpen(false)}>Services</Link></li>
            <li><Link href="/#about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
            {user && (
              <li><Link href="/my-bookings" onClick={() => setMobileMenuOpen(false)}>My Bookings</Link></li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}