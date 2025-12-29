import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold text-primary">
          Care.IO
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href="/my-bookings" className="btn btn-ghost">
          My Bookings
        </Link>
        <Link href="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
}
