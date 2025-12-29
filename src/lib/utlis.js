// src/lib/utils.js

// Validation functions
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  
  return {
    isValid: hasMinLength && hasUppercase && hasLowercase,
    errors: {
      length: !hasMinLength ? 'Password must be at least 6 characters' : null,
      uppercase: !hasUppercase ? 'Password must contain at least one uppercase letter' : null,
      lowercase: !hasLowercase ? 'Password must contain at least one lowercase letter' : null,
    }
  };
};

export const validateNID = (nid) => {
  // Bangladesh NID is 10 or 13 or 17 digits
  return /^\d{10}$|^\d{13}$|^\d{17}$/.test(nid);
};

export const validatePhone = (phone) => {
  // Bangladesh phone number format
  return /^01[3-9]\d{8}$/.test(phone.replace(/[- ]/g, ''));
};

// Format currency
export const formatCurrency = (amount) => {
  return `৳${amount.toLocaleString('en-BD')}`;
};

// Calculate total cost
export const calculateTotalCost = (durationType, durationValue, pricePerHour, pricePerDay) => {
  if (durationType === 'hours') {
    return durationValue * pricePerHour;
  } else {
    return durationValue * pricePerDay;
  }
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Generate booking ID
export const generateBookingId = () => {
  return `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
};