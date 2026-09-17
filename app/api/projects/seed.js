import mongoose from 'mongoose';
import dotenv from 'dotenv';

// .env.local ফাইল থেকে পরিবেশগত ভেরিয়েবল লোড করা
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing in .env.local');
  process.exit(1);
}

// Project Schema
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  longDescription: String,
  techStack: [String],
  liveLink: String,
  githubLink: String,
  imageUrl: String,
  category: String,
  featured: Boolean,
  status: String,
  order: Number,
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB!');

    // পুরাতন ডাটা মুছে নতুন ডাটা রি-ইনসার্ট করা
    await Project.deleteMany({}); 

    await Project.insertMany([
      {
        title: 'Exam Admin Dashboard',
        description: 'Exam Admin Dashboard',
        longDescription: 'Exam Admin Dashboard',
        techStack: [
          'Next.js',
          'JavaScript',
          'Node.js',
          'MySQL'
        ],
        liveLink: 'https://admin-react-seven.vercel.app/',
        githubLink: 'https://github.com/khan-washim/adminReact',
        imageUrl: '',
        category: 'Web App',
        featured: true,
        status: 'Completed',
        order: 0
      },
      {
        title: '15 Munite Exam',
        description: 'A exam portal',
        longDescription: 'Fifteen Minute Exam একটি সম্পূর্ণ ডায়নামিক এক্সাম প্ল্যাটফর্ম, যা প্রতিযোগিতামূলক চাকরির পরীক্ষার প্রস্তুতি নেওয়া শিক্ষার্থীদের জন্য তৈরি করা হয়েছে। আমরা বিশ্বাস করি, সঠিক প্র্যাকটিস আর সময়ের সঠিক ব্যবহারই একজন প্রার্থীকে এগিয়ে রাখে।',
        techStack: [
          'Next.js',
          'JavaScript',
          'Node.js',
          'MySQL',
          'Firebase'
        ],
        liveLink: 'https://15-minute-exam.vercel.app/',
        githubLink: 'https://github.com/khan-washim/15-minute-exam',
        imageUrl: '',
        category: 'Web App',
        featured: true,
        status: 'Completed',
        order: 0
      }
    ]);

    console.log('🚀 Projects inserted successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();