const services = [
  {
    id: "baby",
    name: "Baby Care",
    title: "Professional Baby Care Services",
    pricePerDay: 800,
    pricePerHour: 100,
    category: "Child Care",
    icon: "👶",
    description:
      "Professional and verified babysitters providing safe, loving care for your children at home.",
    fullDescription:
      "Our Baby Care service provides professional, verified babysitters who are trained to ensure your child's safety, happiness, and well-being. Our caregivers are background-checked, experienced, and passionate about childcare. Whether you need care during work hours, date nights, or special occasions, we provide flexible scheduling to meet your family's needs. All our babysitters are trained in first aid and child development, ensuring your little ones receive the best care possible.",
    features: [
      "Verified caregivers with background checks",
      "Flexible hours (day/night care)",
      "Safe & trusted service",
      "First aid certified",
      "Age-appropriate activities",
      "Meal preparation",
      "Homework assistance",
    ],
    availability: "24/7",
    minDuration: 4,
  },
  {
    id: "elderly",
    name: "Elderly Care",
    title: "Compassionate Elderly Care Services",
    pricePerDay: 1000,
    pricePerHour: 120,
    category: "Senior Care",
    icon: "👴",
    description:
      "Compassionate elderly care services ensuring comfort, dignity, and daily assistance.",
    fullDescription:
      "Our Elderly Care service offers compassionate, professional care for senior family members. Our trained caregivers provide assistance with daily activities, medication management, companionship, and medical support. We understand the unique needs of elderly individuals and provide personalized care plans that respect their dignity and independence. Our caregivers are experienced in handling various health conditions and can work with families to ensure the best quality of life for their loved ones.",
    features: [
      "Medication management and support",
      "Daily living assistance",
      "Experienced caregivers",
      "Health monitoring",
      "Companionship and social interaction",
      "Meal preparation",
      "Transportation assistance",
    ],
    availability: "24/7",
    minDuration: 6,
  },
  {
    id: "sick",
    name: "Sick Care",
    title: "Professional Medical Care at Home",
    pricePerDay: 1200,
    pricePerHour: 150,
    category: "Medical Care",
    icon: "🏥",
    description:
      "Home-based medical and recovery care for patients after illness or surgery.",
    fullDescription:
      "Our Sick Care service provides professional medical care at home for patients recovering from illness, surgery, or managing chronic conditions. Our trained nurses and medical caregivers offer post-operative care, wound management, medication administration, and health monitoring. This service is ideal for patients who need medical attention but prefer to recover in the comfort of their own home. We work closely with families and healthcare providers to ensure continuity of care.",
    features: [
      "Trained nurses and medical staff",
      "Post-surgery care",
      "24/7 medical support",
      "Wound care and dressing",
      "Vital signs monitoring",
      "Medication administration",
      "Physical therapy assistance",
    ],
    availability: "24/7",
    minDuration: 8,
  },
];

// Helper function to get service by ID
export function getServiceById(id) {
  return services.find(service => service.id === id);
}

export default services;
