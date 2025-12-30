import { NextResponse } from 'next/server';
import { saveUser, findUserByEmail } from '@/lib/db';
import { validateEmail, validatePassword, validateNID, validatePhone } from '@/lib/utlis';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const { nid, name, email, contact, password } = body;

    // Validation
    if (!nid || !name || !email || !contact || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!validateNID(nid)) {
      return NextResponse.json(
        { error: 'Invalid NID number. Must be 10, 13, or 17 digits' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!validatePhone(contact)) {
      return NextResponse.json(
        { error: 'Invalid phone number. Must be a valid Bangladesh mobile number' },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      const errors = Object.values(passwordValidation.errors).filter(e => e !== null);
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      nid,
      name,
      email,
      contact,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    const savedUser = saveUser(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = savedUser;

    // Set session cookie to auto-login after registration
    const cookieStore = await cookies();
    cookieStore.set('session', savedUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json(
      { user: userWithoutPassword, message: 'Registration successful' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

