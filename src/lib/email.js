import nodemailer from 'nodemailer';
import { formatCurrency, formatDate } from './utlis';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendInvoiceEmail(userEmail, userName, booking, service) {
  try {
    // Don't send email if SMTP is not configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('SMTP not configured, skipping email');
      return;
    }

    const location = [
      booking.division,
      booking.district,
      booking.city,
      booking.area,
    ].filter(Boolean).join(', ');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .invoice-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .invoice-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .invoice-row:last-child { border-bottom: none; font-weight: bold; font-size: 1.2em; }
            .status { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
            .status-pending { background: #fef3c7; color: #92400e; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Care.IO - Booking Invoice</h1>
            </div>
            <div class="content">
              <p>Dear ${userName},</p>
              <p>Thank you for booking with Care.IO! Your booking has been confirmed.</p>
              
              <div class="invoice-box">
                <h2>Booking Details</h2>
                <div class="invoice-row">
                  <span>Booking ID:</span>
                  <span><strong>${booking.id}</strong></span>
                </div>
                <div class="invoice-row">
                  <span>Service:</span>
                  <span>${service.name}</span>
                </div>
                <div class="invoice-row">
                  <span>Duration:</span>
                  <span>${booking.durationValue} ${booking.durationType}</span>
                </div>
                <div class="invoice-row">
                  <span>Location:</span>
                  <span>${location}</span>
                </div>
                <div class="invoice-row">
                  <span>Address:</span>
                  <span>${booking.address}</span>
                </div>
                <div class="invoice-row">
                  <span>Status:</span>
                  <span class="status status-pending">${booking.status}</span>
                </div>
                <div class="invoice-row">
                  <span>Total Cost:</span>
                  <span>${formatCurrency(booking.totalCost)}</span>
                </div>
                <div class="invoice-row">
                  <span>Booking Date:</span>
                  <span>${formatDate(booking.createdAt)}</span>
                </div>
              </div>

              <p>We will contact you shortly to confirm the details and schedule your service.</p>
              
              <div class="footer">
                <p>Best regards,<br>The Care.IO Team</p>
                <p>For any queries, please contact us at support@care.io</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
      Care.IO - Booking Invoice

      Dear ${userName},

      Thank you for booking with Care.IO! Your booking has been confirmed.

      Booking Details:
      - Booking ID: ${booking.id}
      - Service: ${service.name}
      - Duration: ${booking.durationValue} ${booking.durationType}
      - Location: ${location}
      - Address: ${booking.address}
      - Status: ${booking.status}
      - Total Cost: ${formatCurrency(booking.totalCost)}
      - Booking Date: ${formatDate(booking.createdAt)}

      We will contact you shortly to confirm the details and schedule your service.

      Best regards,
      The Care.IO Team
    `;

    await transporter.sendMail({
      from: `"Care.IO" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: `Booking Confirmation - ${booking.id}`,
      text: textContent,
      html: htmlContent,
    });

    console.log('Invoice email sent successfully');
  } catch (error) {
    console.error('Error sending invoice email:', error);
    throw error;
  }
}

