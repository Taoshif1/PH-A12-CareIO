'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PrivateRoute from '@/components/auth/PrivateRoute';
import { getServiceById } from '@/data/services';
import { divisions, districts, cities, areas } from '@/data/locations';
import { calculateTotalCost, formatCurrency } from '@/lib/utlis';
import { Calendar, MapPin, DollarSign, Clock } from 'lucide-react';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.serviceId;
  const service = getServiceById(serviceId);

  const [durationType, setDurationType] = useState('hours');
  const [durationValue, setDurationValue] = useState(service?.minDuration || 4);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!service) {
      router.push('/');
    }
  }, [service, router]);

  if (!service) {
    return null;
  }

  const availableDistricts = selectedDivision ? (districts[selectedDivision] || []) : [];
  const availableCities = selectedDistrict ? (cities[selectedDistrict] || []) : [];
  const availableAreas = selectedCity ? (areas[selectedCity] || []) : [];

  const totalCost = calculateTotalCost(
    durationType,
    durationValue,
    service.pricePerHour,
    service.pricePerDay
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!address.trim()) {
      setError('Please enter your full address');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          durationType,
          durationValue: parseInt(durationValue),
          division: selectedDivision,
          district: selectedDistrict,
          city: selectedCity,
          area: selectedArea,
          address: address.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Booking failed');
      }

      // Redirect to my bookings page
      router.push('/my-bookings');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Book {service.name}</h1>
              <p className="text-white/90">{service.description}</p>
            </div>

            <div className="p-8">
              {error && (
                <div className="alert alert-error mb-6">
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Duration Selection */}
                <div className="card bg-base-100 shadow-md">
                  <div className="card-body">
                    <h2 className="card-title mb-4">
                      <Clock className="w-5 h-5" />
                      Select Duration
                    </h2>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            name="durationType"
                            className="radio radio-primary"
                            checked={durationType === 'hours'}
                            onChange={() => setDurationType('hours')}
                          />
                          <span className="label-text ml-2">Hours</span>
                        </label>
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            name="durationType"
                            className="radio radio-primary"
                            checked={durationType === 'days'}
                            onChange={() => setDurationType('days')}
                          />
                          <span className="label-text ml-2">Days</span>
                        </label>
                      </div>
                      <div>
                        <input
                          type="number"
                          min={durationType === 'hours' ? service.minDuration : 1}
                          className="input input-bordered w-full"
                          value={durationValue}
                          onChange={(e) => setDurationValue(e.target.value)}
                          required
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Minimum: {durationType === 'hours' ? `${service.minDuration} hours` : '1 day'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Selection */}
                <div className="card bg-base-100 shadow-md">
                  <div className="card-body">
                    <h2 className="card-title mb-4">
                      <MapPin className="w-5 h-5" />
                      Select Location
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">
                          <span className="label-text">Division</span>
                        </label>
                        <select
                          className="select select-bordered w-full"
                          value={selectedDivision}
                          onChange={(e) => {
                            setSelectedDivision(e.target.value);
                            setSelectedDistrict('');
                            setSelectedCity('');
                            setSelectedArea('');
                          }}
                          required
                        >
                          <option value="">Select Division</option>
                          {divisions.map((div) => (
                            <option key={div.id} value={div.name}>
                              {div.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="label">
                          <span className="label-text">District</span>
                        </label>
                        <select
                          className="select select-bordered w-full"
                          value={selectedDistrict}
                          onChange={(e) => {
                            setSelectedDistrict(e.target.value);
                            setSelectedCity('');
                            setSelectedArea('');
                          }}
                          disabled={!selectedDivision}
                        >
                          <option value="">Select District</option>
                          {availableDistricts.map((dist) => (
                            <option key={dist.id} value={dist.name}>
                              {dist.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="label">
                          <span className="label-text">City</span>
                        </label>
                        <select
                          className="select select-bordered w-full"
                          value={selectedCity}
                          onChange={(e) => {
                            setSelectedCity(e.target.value);
                            setSelectedArea('');
                          }}
                          disabled={!selectedDistrict}
                        >
                          <option value="">Select City</option>
                          {availableCities.map((city) => (
                            <option key={city.id} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="label">
                          <span className="label-text">Area</span>
                        </label>
                        <select
                          className="select select-bordered w-full"
                          value={selectedArea}
                          onChange={(e) => setSelectedArea(e.target.value)}
                          disabled={!selectedCity}
                        >
                          <option value="">Select Area</option>
                          {availableAreas.map((area, idx) => (
                            <option key={idx} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="label">
                        <span className="label-text">Full Address</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter your complete address (House/Road, Area details)"
                        rows="3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Cost Summary */}
                <div className="card bg-gradient-to-br from-rose-50 to-blue-50 shadow-md">
                  <div className="card-body">
                    <h2 className="card-title mb-4">
                      <DollarSign className="w-5 h-5" />
                      Cost Summary
                    </h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span className="font-semibold">{service.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-semibold">
                          {durationValue} {durationType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate:</span>
                        <span className="font-semibold">
                          {formatCurrency(durationType === 'hours' ? service.pricePerHour : service.pricePerDay)} per {durationType === 'hours' ? 'hour' : 'day'}
                        </span>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total Cost:</span>
                        <span className="text-rose-600">{formatCurrency(totalCost)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Confirm Booking
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}

