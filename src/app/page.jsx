// homepage
import Banner from '@/components/home/Banner';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';
import ServiceCard from '@/components/home/ServiceCard';

const services = [
  { id: "baby", name: "Baby Care", price: 800 },
  { id: "elderly", name: "Elderly Care", price: 1000 },
  { id: "sick", name: "Sick Care", price: 1200 },
];

export const metadata = {
  title: 'Care.IO - Professional Care Services for Your Loved Ones',
  description: 'Find trusted babysitters, elderly care, and medical care services in Bangladesh. Book professional caregivers for your family members with Care.IO.',
  keywords: 'baby care, elderly care, medical care, babysitter Bangladesh, home care services',
  openGraph: {
    title: 'Care.IO - Trusted Care Services',
    description: 'Professional care services for babies, elderly, and sick family members',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div>

      <Banner />
      <About />
          <div className="px-6 py-10">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Trusted Care for Your Loved Ones ❤️
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Book verified caregivers for children, elderly & sick family members.
        </p>
      </section>

      {/* <section className="grid md:grid-cols-3 gap-6 mt-10">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </section> */}
    </div>
      <Services />
      <Testimonials />

    </div>
  );
}