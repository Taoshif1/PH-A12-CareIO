import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { findUserById } from '@/lib/db';
import { getBookingById, updateBooking } from '@/lib/db';

export async function PATCH(request, { params }) {
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

    const booking = getBookingById(params.id);
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if user owns this booking
    if (booking.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { status } = body;

    // Only allow canceling (status change to Cancelled)
    if (status === 'Cancelled') {
      const updatedBooking = updateBooking(params.id, { status: 'Cancelled' });
      return NextResponse.json(
        { booking: updatedBooking, message: 'Booking cancelled successfully' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid status update' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Update booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

