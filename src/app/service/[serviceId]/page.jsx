import Link from "next/link";

export function generateMetadata({ params }) {
  return {
    title: `Care.IO | ${params.serviceId} Service`,
  };
}

export default function ServiceDetails({ params }) {
  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold capitalize">
        {params.serviceId} Care Service
      </h1>
      <p className="mt-4 text-gray-500">
        Professional and verified caregivers available at your home.
      </p>

      <Link
        href={`/booking/${params.serviceId}`}
        className="btn btn-primary mt-6"
      >
        Book Service
      </Link>
    </div>
  );
}
