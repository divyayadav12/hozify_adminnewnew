const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, 'src/modules/cms/appManagement/userApp/data/mockData.js');
let content = fs.readFileSync(mockDataPath, 'utf8');

const updatedPackages = `export const mockPackages = {
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
};`;

content = content.replace(/export const mockPackages = \{[\s\S]*?\};\n/, updatedPackages + '\n');
fs.writeFileSync(mockDataPath, content, 'utf8');
console.log('Done replacing mockPackages');
