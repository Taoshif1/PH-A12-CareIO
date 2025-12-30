// Simple file-based database for development
// In production, replace with MongoDB, PostgreSQL, etc.
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');
const bookingsFile = path.join(dataDir, 'bookings.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
}

if (!fs.existsSync(bookingsFile)) {
  fs.writeFileSync(bookingsFile, JSON.stringify([], null, 2));
}

// Users
export function getUsers() {
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  return user;
}

export function findUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email === email);
}

export function findUserById(id) {
  const users = getUsers();
  return users.find(u => u.id === id);
}

// Bookings
export function getBookings() {
  try {
    const data = fs.readFileSync(bookingsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function saveBooking(booking) {
  const bookings = getBookings();
  bookings.push(booking);
  fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
  return booking;
}

export function getUserBookings(userId) {
  const bookings = getBookings();
  return bookings.filter(b => b.userId === userId);
}

export function getBookingById(id) {
  const bookings = getBookings();
  return bookings.find(b => b.id === id);
}

export function updateBooking(id, updates) {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updates };
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
    return bookings[index];
  }
  return null;
}

