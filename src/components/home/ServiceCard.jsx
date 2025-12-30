import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServiceCard({ service }) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-rose-200">
      {/* Gradient Top Bar */}
      <div className="h-2 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500"></div>
      
      <div className="p-8">
        {/* Icon */}
        <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {service.name}
        </h3>

        {/* Category */}
        <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide">
          {service.category}
        </p>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-rose-600">
              ৳{service.pricePerDay}
            </span>
            <span className="text-gray-500">/ day</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            or ৳{service.pricePerHour} / hour
          </p>
        </div>

        {/* Features */}
        <div className="mb-6 space-y-2">
          {service.features.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
          {service.features.length > 3 && (
            <p className="text-sm text-gray-500 ml-6">
              +{service.features.length - 3} more features
            </p>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={`/service/${service.id}`}
          className="btn btn-primary w-full group/btn"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 to-purple-500/0 group-hover:from-rose-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}
