import ServiceCard from "./ServiceCard";

const services = [
  { id: "baby", name: "Baby Care", price: 800 },
  { id: "elderly", name: "Elderly Care", price: 1000 },
  { id: "sick", name: "Sick Care", price: 1200 },
];

export default function Services() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
