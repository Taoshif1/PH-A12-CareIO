'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Fatima Rahman',
    role: 'Working Mother',
    image: '👩',
    rating: 5,
    text: 'Care.IO has been a lifesaver! The babysitter they provided is professional, caring, and my daughter loves her. I can focus on work without worry.',
    service: 'Baby Care',
  },
  {
    id: 2,
    name: 'Kamal Hossain',
    role: 'Son of Elderly Parent',
    image: '👨',
    rating: 5,
    text: 'The elderly care service is exceptional. The caregiver is patient, respectful, and treats my father with such dignity. Highly recommended!',
    service: 'Elderly Care',
  },
  {
    id: 3,
    name: 'Nusrat Ahmed',
    role: 'Family Caregiver',
    image: '👩‍⚕️',
    rating: 5,
    text: 'After my husband\'s surgery, we needed medical care at home. Care.IO provided a trained nurse who made recovery so much easier. Thank you!',
    service: 'Medical Care',
  },
];

const stats = [
  { number: '10,000+', label: 'Happy Families' },
  { number: '500+', label: 'Verified Caregivers' },
  { number: '50,000+', label: 'Hours of Care' },
  { number: '4.9/5', label: 'Average Rating' },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-rose-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from families who trust Care.IO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-rose-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="text-5xl mr-4">{testimonial.image}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-medium text-rose-600">
                {testimonial.service}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Experience Quality Care?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families who trust Care.IO for their loved ones
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#services" className="btn btn-lg bg-white text-rose-600 hover:bg-gray-100 border-0">
              Book a Service
            </a>
            <a href="/register" className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-rose-600">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}