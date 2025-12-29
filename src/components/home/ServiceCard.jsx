import Link from "next/link";

export default function ServiceCard({ service }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{service.name}</h2>
        <p>Starting from ৳{service.price} / day</p>
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
