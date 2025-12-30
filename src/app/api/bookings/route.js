import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { findUserById } from '@/lib/db';
import { saveBooking, getUserBookings } from '@/lib/db';
import { getServiceById } from '@/data/services';
import { generateBookingId, calculateTotalCost } from '@/lib/utlis';
import { sendInvoiceEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = findUserById(sessionId);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { serviceId, durationType, durationValue, division, district, city, area, address } = body;

    // Validation
    if (!serviceId || !durationType || !durationValue || !division || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const service = getServiceById(serviceId);
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Validate minimum duration
    if (durationType === 'hours' && durationValue < service.minDuration) {
      return NextResponse.json(
        { error: `Minimum duration is ${service.minDuration} hours for this service` },
        { status: 400 }
      );
    }

    // Calculate total cost
    const totalCost = calculateTotalCost(
      durationType,
      durationValue,
      service.pricePerHour,
      service.pricePerDay
    );

    // Create booking
    const booking = {
      id: generateBookingId(),
      userId: user.id,
      serviceId: service.id,
      serviceName: service.name,
      durationType,
      durationValue,
      division,
      district: district || '',
      city: city || '',
      area: area || '',
      address,
      totalCost,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    const savedBooking = saveBooking(booking);

    // Send invoice email
    try {
      await sendInvoiceEmail(user.email, user.name, savedBooking, service);
    } catch (emailError) {
      console.error('Failed to send invoice email:', emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json(
      { booking: savedBooking, message: 'Booking created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = findUserById(sessionId);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const bookings = getUserBookings(user.id);
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

