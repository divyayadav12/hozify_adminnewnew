export const mockServices = [
  {
    id: 's1',
    name: "Women's Salon",
    description: 'Expert salon services at home',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
    availableServices: 12,
    status: 'Active',
    subCategories: [
      { id: 'sc1', name: 'Salon Luxe', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=150&q=80' },
      { id: 'sc2', name: 'Waxing', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=150&q=80' },
      { id: 'sc3', name: 'Spa & Body', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=150&q=80' },
      { id: 'sc4', name: 'Facials', image: '/images/facial.jpg' },
      { id: 'sc5', name: 'Manicure', image: '/images/manicure.jpg' },
      { id: 'sc6', name: 'Hair Styling', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=150&q=80' }
    ],
    variants: [
      { id: 'v1', name: 'Luxe', tags: ['PREMIUM CARE', 'DEEP SANITIZE', 'PLATINUM'], description: 'Premium quality treatments & top rated partners', image: '/images/variant_luxe.jpg' },
      { id: 'v2', name: 'Prime', tags: ['STANDARD CARE', 'ECO-SAFE', 'VERIFIED'], description: 'Standard quality trusted services', image: '/images/variant_prime.jpg' }
    ]
  },
  {
    id: 's2',
    name: 'Massage for Men',
    description: 'Relaxing massages by professionals',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80',
    availableServices: 8,
    status: 'Active',
    subCategories: [
      { id: 'sc7', name: 'Deep Tissue', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=150&q=80' },
      { id: 'sc8', name: 'Stress Relief', image: '/images/stress_relief.jpg' },
      { id: 'sc9', name: 'Swedish Therapy', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=150&q=80' },
      { id: 'sc10', name: 'Sports Massage', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=150&q=80' },
      { id: 'sc11', name: 'Hot Stone', image: '/images/hot_stone_new.jpg' },
      { id: 'sc12', name: 'Aromatherapy', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=150&q=80' }
    ],
    variants: [
      { id: 'v3', name: 'Luxe', tags: ['PREMIUM CARE', 'CERTIFIED THERAPIST'], description: 'Highly rated expert therapists', image: '/images/variant_luxe.jpg' },
      { id: 'v4', name: 'Prime', tags: ['STANDARD', 'VERIFIED'], description: 'Professional relaxing massage', image: '/images/variant_prime.jpg' }
    ]
  },
  {
    id: 's3',
    name: 'Cleaning',
    description: 'Deep cleaning for your home',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
    availableServices: 15,
    status: 'Active',
    subCategories: [
      { id: 'sc13', name: 'Home Cleaning', image: '/images/cleaning_window.jpg' },
      { id: 'sc14', name: 'Sofa Cleaning', image: '/images/cleaning_robot.jpg' },
      { id: 'sc15', name: 'Kitchen Deep', image: '/images/cleaning_kitchen.jpg' },
      { id: 'sc16', name: 'Bathroom Deep', image: '/images/cleaning_bathroom.jpg' },
      { id: 'sc17', name: 'Car Deep Clean', image: '/images/cleaning_car.jpg' },
      { id: 'sc18', name: 'Chimney Care', image: '/images/electrician_hard_hat.jpg' }
    ],
    variants: [
      { id: 'v5', name: 'Luxe', tags: ['MECHANISED EQUIP', 'ECO-SAFE', 'TOP RATED'], description: 'Professional mechanised cleaning', image: '/images/variant_luxe.jpg' },
      { id: 'v6', name: 'Prime', tags: ['STANDARD CLEAN', 'VERIFIED'], description: 'Standard manual cleaning', image: '/images/variant_prime.jpg' }
    ]
  },
  {
    id: 's4',
    name: 'AC & Appliance Repair',
    description: 'Quick repair for your appliances',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80',
    availableServices: 20,
    status: 'Active',
    subCategories: [
      { id: 'sc19', name: 'Electrician', image: '/images/electrician_hard_hat.jpg' },
      { id: 'sc20', name: 'Plumber', image: '/images/cleaning_bathroom.jpg' },
      { id: 'sc21', name: 'AC Service', image: '/images/electrician_hard_hat.jpg' },
      { id: 'sc22', name: 'Fan Repair', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=150&q=80' },
      { id: 'sc23', name: 'Switchboard Fix', image: '/images/electrician_hard_hat.jpg' },
      { id: 'sc24', name: 'Drain Cleaning', image: '/images/cleaning_bathroom.jpg' }
    ],
    variants: [
      { id: 'v7', name: 'Prime', tags: ['VERIFIED', 'QUICK FIX'], description: 'Quick on-time professional service', image: '/images/variant_prime.jpg' }
    ]
  },
  {
    id: 's5',
    name: 'Painting',
    description: 'Professional wall painting',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80',
    availableServices: 5,
    status: 'Active',
    subCategories: [
      { id: 'sc25', name: 'Home makeover', image: '/images/painting_home.jpg' },
      { id: 'sc26', name: 'Rental home painting', image: '/images/painting_rental.jpg' },
      { id: 'sc27', name: 'Few walls & rooms painting', image: '/images/painting_walls.jpg' }
    ]
  }
];

export const mockPackages = {
  's1': [
    {
      id: 'p1', serviceId: 's1', name: 'Luxe Salon Package',
      price: 1999, originalPrice: 2500, discount: '20% OFF',
      rating: 4.8, reviews: 1240, duration: '2 hrs 30 mins',
      image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80',
      features: ['Facial', 'Manicure', 'Pedicure', 'Threading'], status: 'Active'
    },
    {
      id: 'p2', serviceId: 's1', name: 'Prime Makeover',
      price: 999, originalPrice: 1500, discount: '33% OFF',
      rating: 4.6, reviews: 890, duration: '1 hr 15 mins',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
      features: ['Haircut', 'Hair Spa'], status: 'Active'
    },
    {
      id: 'p1_3', serviceId: 's1', name: 'Bridal Glow Spa',
      price: 2999, originalPrice: 3500, discount: '14% OFF',
      rating: 4.9, reviews: 200, duration: '3 hrs',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
      features: ['Deep Cleansing', 'Gold Facial', 'Body Massage'], status: 'Active'
    },
    {
      id: 'p1_4', serviceId: 's1', name: 'Waxing Combo',
      price: 499, originalPrice: 800, discount: '37% OFF',
      rating: 4.7, reviews: 3200, duration: '45 mins',
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&w=400&q=80',
      features: ['Full Arms', 'Full Legs', 'Underarms'], status: 'Active'
    }
  ],
  's2': [
    {
      id: 'p3', serviceId: 's2', name: 'Stress Relief Massage',
      price: 1299, originalPrice: 1800, discount: '27% OFF',
      rating: 4.9, reviews: 450, duration: '60 mins',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80',
      features: ['Full Body Swedish Massage', 'Aromatherapy Oils'], status: 'Active'
    },
    {
      id: 'p3_2', serviceId: 's2', name: 'Deep Tissue Therapy',
      price: 1599, originalPrice: 2000, discount: '20% OFF',
      rating: 4.8, reviews: 820, duration: '90 mins',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=400&q=80',
      features: ['Deep Tissue Massage', 'Hot Stone'], status: 'Active'
    }
  ],
  's3': [
    {
      id: 'p4', serviceId: 's3', name: 'Deep Home Cleaning',
      price: 2999, originalPrice: 4000, discount: '25% OFF',
      rating: 4.7, reviews: 620, duration: '5 hrs',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
      features: ['Dusting', 'Floor Scrubbing', 'Bathroom Deep Cleaning'], status: 'Active'
    },
    {
      id: 'p4_2', serviceId: 's3', name: 'Sofa & Carpet Cleaning',
      price: 899, originalPrice: 1200, discount: '25% OFF',
      rating: 4.6, reviews: 1420, duration: '2 hrs',
      image: 'https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&w=400&q=80',
      features: ['Dry Vacuuming', 'Wet Shampooing', 'Stain Removal'], status: 'Active'
    }
  ],
  's4': [
    {
      id: 'p5', serviceId: 's4', name: 'AC Regular Service',
      price: 499, originalPrice: 799, discount: '37% OFF',
      rating: 4.8, reviews: 2100, duration: '45 mins',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80',
      features: ['Filter Cleaning', 'Gas Check', 'Coil Cleaning'], status: 'Active'
    }
  ],
  's5': [
    {
      id: 'p6', serviceId: 's5', name: '1 BHK Painting',
      price: 5999, originalPrice: 8000, discount: '25% OFF',
      rating: 4.7, reviews: 310, duration: '2 Days',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80',
      features: ['2 Coats Paint', 'Wall Putty', 'Post Cleanup'], status: 'Active'
    }
  ]
};

export const mockAddresses = [
  {
    id: 'a1',
    type: 'Home',
    name: 'John Doe',
    phone: '+91 9876543210',
    addressLine1: 'A-123, Sunrise Apartments',
    addressLine2: 'MG Road, Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034'
  },
  {
    id: 'a2',
    type: 'Office',
    name: 'John Doe',
    phone: '+91 9876543210',
    addressLine1: 'Tower B, Tech Park',
    addressLine2: 'Whitefield',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560066'
  }
];

export const mockSlots = {
  availableDates: [
    { id: 'd1', date: 'Today', shortDate: '10 Jul' },
    { id: 'd2', date: 'Tomorrow', shortDate: '11 Jul' },
    { id: 'd3', date: 'Thu', shortDate: '12 Jul' }
  ],
  timeSlots: {
    morning: [
      { id: 't1', time: '09:00 AM', available: true },
      { id: 't2', time: '10:00 AM', available: true },
      { id: 't3', time: '11:00 AM', available: false }
    ],
    afternoon: [
      { id: 't4', time: '12:00 PM', available: true },
      { id: 't5', time: '02:00 PM', available: true },
      { id: 't6', time: '04:00 PM', available: true }
    ],
    evening: [
      { id: 't7', time: '05:00 PM', available: true },
      { id: 't8', time: '06:00 PM', available: false },
      { id: 't9', time: '07:30 PM', available: true }
    ]
  }
};

export const mockOrders = [
  {
    id: 'ORD-8921',
    customerName: 'Alice Smith',
    serviceName: "Women's Salon",
    packageName: 'Luxe Salon Package',
    date: '10 Jul 2026',
    timeSlot: '10:00 AM',
    status: 'Confirmed',
    amount: 1999
  },
  {
    id: 'ORD-8922',
    customerName: 'Bob Johnson',
    serviceName: 'AC & Appliance Repair',
    packageName: 'AC Regular Service',
    date: '11 Jul 2026',
    timeSlot: '02:00 PM',
    status: 'Completed',
    amount: 499
  }
];

export const mockPayments = [
  {
    id: 'TXN-909283',
    orderId: 'ORD-8921',
    amount: 1999,
    method: 'UPI',
    status: 'Success',
    date: '09 Jul 2026, 04:30 PM'
  },
  {
    id: 'TXN-909284',
    orderId: 'ORD-8922',
    amount: 499,
    method: 'Credit Card',
    status: 'Success',
    date: '10 Jul 2026, 11:15 AM'
  }
];
