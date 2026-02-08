// data.jsx
export const SERVICES = [
  { id: 's1', name: 'Deep Tissue Massage', duration: 60, price: 95, category: 'Wellness', description: 'Targeted pressure to release chronic muscle tension.' },
  { id: 's2', name: 'Facial Rejuvenation', duration: 45, price: 75, category: 'Beauty', description: 'Glow-enhancing treatment with premium organic oils.' },
  { id: 's3', name: 'Yoga Private Session', duration: 75, price: 110, category: 'Fitness', description: 'One-on-one guided flow tailored to your level.' },
  { id: 's4', name: 'Acupuncture Therapy', duration: 60, price: 120, category: 'Health', description: 'Traditional healing to balance energy and reduce pain.' },
  { id: 's5', name: 'Barber Grooming', duration: 30, price: 45, category: 'Beauty', description: 'Classic haircut and beard trim with hot towel finish.' },
];

export const STAFF = [
  {
    id: 'st1',
    name: 'Elena Rodriguez',
    role: 'Lead Therapist',
    avatar: 'https://picsum.photos/seed/elena/200',
    specialties: ['s1', 's2'],
    availability: [
      { day: 1, start: '09:00', end: '17:00' },
      { day: 2, start: '09:00', end: '17:00' },
      { day: 3, start: '09:00', end: '17:00' },
      { day: 4, start: '09:00', end: '17:00' },
      { day: 5, start: '09:00', end: '17:00' },
    ]
  },
  {
    id: 'st2',
    name: 'Marcus Chen',
    role: 'Fitness Coach',
    avatar: 'https://picsum.photos/seed/marcus/200',
    specialties: ['s3', 's5'],
    availability: [
      { day: 2, start: '10:00', end: '19:00' },
      { day: 4, start: '10:00', end: '19:00' },
      { day: 6, start: '09:00', end: '14:00' },
    ]
  },
  {
    id: 'st3',
    name: 'Dr. Sarah Smith',
    role: 'Health Specialist',
    avatar: 'https://picsum.photos/seed/sarah/200',
    specialties: ['s4'],
    availability: [
      { day: 1, start: '08:00', end: '16:00' },
      { day: 3, start: '08:00', end: '16:00' },
      { day: 5, start: '08:00', end: '16:00' },
    ]
  }
];

export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];
