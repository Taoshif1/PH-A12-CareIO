import { getServiceById } from '@/data/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, DollarSign, CheckCircle } from 'lucide-react';

export async function generateMetadata({ params }) {
  const service = getServiceById(params.serviceId);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.name} - Care.IO`,
    description: service.fullDescription,
    keywords: `${service.name}, ${service.title}, care services Bangladesh`,
  };
}

export default function ServiceDetailPage({ params }) {
  const service = getServiceById(params.serviceId);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-12 text-center">
            <div className="text-7xl mb-4">{service.icon}</div>
            <h1 className="text-4xl font-bold text-white mb-2">{service.title}</h1>
            <p className="text-xl text-white/90">{service.description}</p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Service</h2>
                  <p className="text-gray-600 leading-relaxed">{service.fullDescription}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-rose-50 to-blue-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Pricing</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-rose-500" />
                        <span className="text-gray-700">Per Hour</span>
                      </div>
                      <span className="text-2xl font-bold text-rose-600">৳{service.pricePerHour}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-rose-500" />
                        <span className="text-gray-700">Per Day</span>
                      </div>
                      <span className="text-2xl font-bold text-rose-600">৳{service.pricePerDay}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">✓</div>
                    <p className="font-semibold text-green-900">Available {service.availability}</p>
                    <p className="text-sm text-green-700 mt-1">Min {service.minDuration} hours</p>
                  </div>
                </div>

                <Link
                  href={`/booking/${service.id}`}
                  className="btn btn-primary w-full btn-lg"
                >
                  Book This Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}