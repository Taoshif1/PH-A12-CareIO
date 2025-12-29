import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2">Page Not Found</p>
      <Link href="/" className="btn btn-primary mt-4">
        Go Home
      </Link>
    </div>
  );
}
