// homepage
import Banner from '@/components/home/Banner';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';

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
    <div className="min-h-screen">
      <Banner />
      <About />
      <Services />
      <Testimonials />
    </div>
  );
}
