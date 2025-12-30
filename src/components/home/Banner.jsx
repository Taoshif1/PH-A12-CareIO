'use client';

import Link from 'next/link';
import { Heart, Shield, Clock, Users } from 'lucide-react';

export default function Banner() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-500 via-purple-600 to-blue-600">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Heart className="w-12 h-12 text-white" fill="currentColor" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Trusted Care for Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
            Loved Ones
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          Find verified babysitters, elderly care professionals, and home care experts in your area. 
          Professional, compassionate, and reliable care services at your doorstep.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link 
            href="/#services" 
            className="btn btn-lg bg-white text-rose-600 hover:bg-gray-100 border-0 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Explore Services
          </Link>
          <Link 
            href="/register" 
            className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Shield className="w-8 h-8 text-white mx-auto mb-3" />
            <h3 className="text-white font-semibold text-sm md:text-base">Verified Caregivers</h3>
            <p className="text-white/80 text-xs mt-1">Background Checked</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Clock className="w-8 h-8 text-white mx-auto mb-3" />
            <h3 className="text-white font-semibold text-sm md:text-base">24/7 Available</h3>
            <p className="text-white/80 text-xs mt-1">Round the Clock</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Users className="w-8 h-8 text-white mx-auto mb-3" />
            <h3 className="text-white font-semibold text-sm md:text-base">10,000+ Families</h3>
            <p className="text-white/80 text-xs mt-1">Trusted Service</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Heart className="w-8 h-8 text-white mx-auto mb-3" fill="currentColor" />
            <h3 className="text-white font-semibold text-sm md:text-base">Compassionate Care</h3>
            <p className="text-white/80 text-xs mt-1">With Love</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
