'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PrivateRoute from '@/components/auth/PrivateRoute';
import { formatCurrency, formatDate } from '@/lib/utlis';
import { Calendar, MapPin, DollarSign, Clock, X, Eye } from 'lucide-react';
import Link from 'next/link';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      // Refresh bookings
      fetchBookings();
    } catch (err) {
      alert(err.message || 'Failed to cancel booking');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'badge-warning',
      Confirmed: 'badge-success',
      Completed: 'badge-info',
      Cancelled: 'badge-error',
    };
    return styles[status] || 'badge-ghost';
  };

  if (loading) {
    return (
      <PrivateRoute>
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage your care service bookings</p>
          </div>

          {error && (
            <div className="alert alert-error mb-6">
              <span>{error}</span>
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="card bg-white shadow-xl">
              <div className="card-body text-center py-16">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 mb-2">No Bookings Yet</h2>
                <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
                <Link href="/#services" className="btn btn-primary">
                  Browse Services
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="card bg-white shadow-lg">
                  <div className="card-body">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {booking.serviceName}
                          </h3>
                          <span className={`badge ${getStatusBadge(booking.status)} badge-lg`}>
                            {booking.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="flex items-start gap-2">
                            <Clock className="w-5 h-5 text-rose-500 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Duration</p>
                              <p className="font-semibold">
                                {booking.durationValue} {booking.durationType}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <MapPin className="w-5 h-5 text-rose-500 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-semibold">
                                {[booking.division, booking.district, booking.city, booking.area]
                                  .filter(Boolean)
                                  .join(', ')}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <DollarSign className="w-5 h-5 text-rose-500 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Total Cost</p>
                              <p className="font-semibold text-rose-600">
                                {formatCurrency(booking.totalCost)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Calendar className="w-5 h-5 text-rose-500 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Booking Date</p>
                              <p className="font-semibold">
                                {formatDate(booking.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {booking.address && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">Address:</p>
                            <p className="font-medium">{booking.address}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 md:min-w-[200px]">
                        <Link
                          href={`/service/${booking.serviceId}`}
                          className="btn btn-outline btn-sm w-full"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Link>
                        {booking.status === 'Pending' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="btn btn-error btn-sm w-full"
                          >
                            <X className="w-4 h-4" />
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}

