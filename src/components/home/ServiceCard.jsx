import Link from "next/link";

export default function ServiceCard({ service }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{service.name}</h2>
        <p className="mt-2 font-semibold">
  ৳{service.pricePerDay} / day
</p>

<ul className="mt-4 list-disc pl-5 text-gray-600">
  {service.features.map((feature, i) => (
    <li key={i}>{feature}</li>
  ))}
</ul>
        <div className="card-actions justify-end">
          <Link
            href={`/service/${service.id}`}
            className="btn btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
