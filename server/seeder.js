require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Attraction = require('./models/Attraction');
const Event = require('./models/Event');

const seed = async () => {
  await connectDB();

  await User.deleteMany();
  await Attraction.deleteMany();
  await Event.deleteMany();

  const admin = await User.create({
    name: 'Admin ExplorePK',
    email: 'admin@explorepk.com',
    password: 'admin123',
    role: 'admin'
  });

  await User.create({
    name: 'Test User',
    email: 'user@explorepk.com',
    password: 'user123',
    role: 'user'
  });

  const attractions = await Attraction.insertMany([
    {
      name: 'Badshahi Mosque',
      city: 'Lahore',
      category: 'religious',
      description: 'One of the largest mosques in the world, built during the Mughal era by Emperor Aurangzeb in 1673. A masterpiece of Mughal architecture with stunning red sandstone and white marble.',
      images: ['https://wallpaperaccess.com/full/6862503.jpg'],
      location: { lat: 31.5881, lng: 74.3101 },
      timings: 'Open daily 9:00 AM - 10:00 PM',
      nearbyHotels: ['Pearl Continental Lahore', 'Avari Hotel', 'Faletti\'s Hotel'],
      averageRating: 4.8,
      totalReviews: 0,
      createdBy: admin._id
    },
    {
      name: 'Mohenjo-daro',
      city: 'Larkana',
      category: 'historical',
      description: 'UNESCO World Heritage Site and one of the largest cities of the ancient Indus Valley Civilisation, flourishing around 2500 BCE. A remarkable window into one of the world\'s earliest urban cultures.',
      images: ['https://tse2.mm.bing.net/th/id/OIP.qkA1Upsy8asqPr0RBrjc6gHaFl?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'],
      location: { lat: 27.3244, lng: 68.1379 },
      timings: 'Open daily 8:00 AM - 5:00 PM',
      nearbyHotels: ['Indus Hotel Larkana', 'Mehran Hotel'],
      averageRating: 4.5,
      totalReviews: 0,
      createdBy: admin._id
    },
    {
      name: 'Saif ul Malook Lake',
      city: 'Mansehra',
      category: 'natural',
      description: 'A breathtaking glacial lake situated at an altitude of 3,224 meters in the Kaghan Valley. Surrounded by snow-capped peaks and featured in the famous Punjabi poem by Mian Muhammad Bakhsh.',
      images: ['https://res.cloudinary.com/raastay/images/w_2560,h_895/f_auto,q_auto/v1657046870/Lake-Saiful-Muluk-1/Lake-Saiful-Muluk-1.jpg?_i=AA'],
      location: { lat: 34.8821, lng: 73.6939 },
      timings: 'Best visited June - September',
      nearbyHotels: ['Pine Park Hotel Naran', 'PTDC Motel Naran', 'Lalazar Hotel'],
      averageRating: 4.9,
      totalReviews: 0,
      createdBy: admin._id
    },
    {
      name: 'Hunza Valley',
      city: 'Hunza',
      category: 'natural',
      description: 'A breathtaking mountain valley known for its stunning scenery, ancient forts, and legendary hospitality. Surrounded by Rakaposhi, Ultar Sar, and Lady Finger peaks.',
      images: ['https://th.bing.com/th/id/R.07a8cb8bdd9f5e5ec25851d0c69b92a5?rik=fckmnTN4wg%2fldg&pid=ImgRaw&r=0'],
      location: { lat: 36.3167, lng: 74.6500 },
      timings: 'Open year-round (best April - October)',
      nearbyHotels: ['Serena Hotel Hunza', 'Eagle\'s Nest Hotel', 'Old Hunza Inn'],
      averageRating: 4.9,
      totalReviews: 0,
      createdBy: admin._id
    },
    {
      name: 'Lahore Fort',
      city: 'Lahore',
      category: 'historical',
      description: 'A UNESCO World Heritage Site, this magnificent fort complex covers 20 hectares and contains 21 notable monuments built during the reigns of Akbar, Jahangir, Shah Jahan, and Aurangzeb.',
      images: ['https://cdn.britannica.com/38/250238-050-21F76AE4/Lahore-fort-UNESCO-World-Heritage-site-Punjab-Pakistan.jpg'],
      location: { lat: 31.5883, lng: 74.3155 },
      timings: 'Open daily 8:30 AM - 5:30 PM',
      nearbyHotels: ['Pearl Continental', 'Nishat Hotel', 'Ramada Lahore'],
      averageRating: 4.7,
      totalReviews: 0,
      createdBy: admin._id
    }
  ]);

  await Event.insertMany([
    {
      title: 'Lahore Literary Festival 2026',
      description: 'Pakistan\'s premier literary event bringing together acclaimed authors, poets, and thinkers from across the globe for panels, readings, and workshops celebrating literature and ideas.',
      category: 'cultural',
      city: 'Lahore',
      venue: 'Alhamra Art Council, Lahore',
      date: new Date('2026-02-14'),
      time: '10:00 AM - 8:00 PM',
      images: ['https://destinations.com.pk/wp-content/uploads/2019/02/llf20190.jpg'],
      location: { lat: 31.5547, lng: 74.3505 },
      totalSeats: 500,
      registeredCount: 120,
      isFree: true,
      price: 0,
      createdBy: admin._id
    },
    {
      title: 'Shandur Polo Festival',
      description: 'The world\'s highest polo ground hosts this legendary festival at 3,700 meters. Watch traditional polo matches between Gilgit and Chitral teams surrounded by stunning mountain scenery.',
      category: 'sports',
      city: 'Chitral',
      venue: 'Shandur Pass',
      date: new Date('2026-07-07'),
      time: '2:00 PM - 6:00 PM',
      images: ['https://pakistantourntravel.com/wp-content/uploads/2019/07/Shandur-Polo-Festival-Celebrations-Came-to-an-End-banner.jpg'],
      location: { lat: 36.0667, lng: 72.5667 },
      totalSeats: 2000,
      registeredCount: 450,
      isFree: false,
      price: 500,
      createdBy: admin._id
    },
    {
      title: 'Karachi Eat Food Festival',
      description: 'South Asia\'s largest food festival featuring 150+ food stalls, live cooking competitions, celebrity chef appearances, and a celebration of Pakistan\'s diverse culinary heritage.',
      category: 'food',
      city: 'Karachi',
      venue: 'Frere Hall Grounds, Karachi',
      date: new Date('2026-03-20'),
      time: '12:00 PM - 11:00 PM',
      images: ['https://www.fuchsiamagazine.com/wp-content/uploads/2023/01/Karachi-Eat-1119.jpg'],
      location: { lat: 24.8561, lng: 67.0105 },
      totalSeats: 3000,
      registeredCount: 1200,
      isFree: false,
      price: 300,
      createdBy: admin._id
    },
    {
      title: 'Capital Fest 2026 – Ramzan Mubarak Edition',
      description: 'Pakistan\'s Premier Family, Youth & Corporate Ramadan Festival at F-9 Park, Islamabad. Featuring Eid shopping & food mela, kids & youth engagement zones, CEO networking & corporate collaborations, and Sufi Nights & spiritual reflections.',
      category: 'cultural',
      city: 'Islamabad',
      venue: 'F-9 Park, Islamabad, Pakistan',
      date: new Date('2026-03-14'),
      time: '10:00 AM onwards',
      images: ['https://cdn-az.allevents.in/events4/banners/bc48c7eaf0812ab269f23622c76ecdd864c0e18ec58635f3bf0b97e2ffb89605-rimg-w1024-h1024-dc16122e-gmir?v=1777394506'],
      location: { lat: 33.7215, lng: 73.0433 },
      totalSeats: 1500,
      registeredCount: 600,
      isFree: false,
      price: 1000,
      createdBy: admin._id
    },
    {
      title: 'Youth Entrepreneurship Summit',
      description: 'A platform for young Pakistani entrepreneurs to network, pitch ideas, and learn from industry leaders. Features workshops, mentorship sessions, and startup exhibitions.',
      category: 'youth',
      city: 'Lahore',
      venue: 'LUMS, Lahore',
      date: new Date('2026-05-15'),
      time: '9:00 AM - 6:00 PM',
      images: ['https://bedc.bm/wp-content/uploads/2023/09/GEWEvents2023_YES_Social-1.png'],
      location: { lat: 31.4792, lng: 74.3987 },
      totalSeats: 300,
      registeredCount: 85,
      isFree: true,
      price: 0,
      createdBy: admin._id
    }
  ]);

  console.log('Database seeded successfully!');
  console.log('Admin: admin@explorepk.com / admin123');
  console.log('User:  user@explorepk.com  / user123');
  process.exit();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
