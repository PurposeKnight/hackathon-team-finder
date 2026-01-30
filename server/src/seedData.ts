import mongoose from 'mongoose';
import { User } from './models/User';

const sampleUsers = [
  {
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    bio: 'Frontend developer passionate about React and modern web technologies. Looking for a partner to build the next big SaaS product!',
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
    location: 'San Francisco, CA',
    githubUrl: 'https://github.com/sarahchen',
    linkedinUrl: 'https://linkedin.com/in/sarahchen'
  },
  {
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    bio: 'Full-stack engineer with 5 years experience. Love building scalable backend systems and exploring new frameworks.',
    techStack: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
    location: 'Austin, TX',
    githubUrl: 'https://github.com/marcusj',
    linkedinUrl: 'https://linkedin.com/in/marcusj'
  },
  {
    name: 'Elena Rodriguez',
    email: 'elena@example.com',
    bio: 'Mobile app developer specializing in React Native. Interested in building apps that make a social impact.',
    techStack: ['React Native', 'JavaScript', 'Firebase', 'Swift', 'Kotlin'],
    location: 'Miami, FL',
    githubUrl: 'https://github.com/elenarodriguez'
  },
  {
    name: 'David Kim',
    email: 'david@example.com',
    bio: 'Data scientist turned full-stack developer. Looking to combine ML with web development for innovative projects.',
    techStack: ['Python', 'TensorFlow', 'React', 'FastAPI', 'MongoDB'],
    location: 'Seattle, WA',
    githubUrl: 'https://github.com/davidkim',
    linkedinUrl: 'https://linkedin.com/in/davidkim'
  },
  {
    name: 'Priya Patel',
    email: 'priya@example.com',
    bio: 'DevOps engineer passionate about automation and cloud infrastructure. Want to build developer tools that improve productivity.',
    techStack: ['Kubernetes', 'Terraform', 'Go', 'Python', 'GCP'],
    location: 'New York, NY',
    githubUrl: 'https://github.com/priyapatel'
  }
];

export async function seedDatabase() {
  try {
    // Clear existing users
    await User.deleteMany({});
    
    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`Seeded ${users.length} users successfully`);
    
    return users;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dev-lfg')
    .then(() => {
      console.log('Connected to MongoDB');
      return seedDatabase();
    })
    .then(() => {
      console.log('Database seeded successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}