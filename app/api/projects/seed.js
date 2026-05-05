import mongoose from 'mongoose';
import dotenv from 'dotenv'; // .env ফাইল থেকে ডাটা রিড করার জন্য

// .env.local ফাইলটি লোড করার জন্য এটি প্রয়োজন (যদি স্ক্রিপ্ট আলাদাভাবে রান করেন)
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing in .env.local');
  process.exit(1);
}

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  tags: [String],
  github: String,
  demo: String,
  featured: Boolean,
  category: String,
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function seed() {
  try {
    // এখানে সরাসরি MONGODB_URI ভেরিয়েবলটি ব্যবহার করুন
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB!');

    // পুরাতন ডাটা ডিলিট করে নতুন করে ইনসার্ট করা নিরাপদ
    await Project.deleteMany({}); 
    
    await Project.insertMany([
      {
        title: "Portfolio Website",
        description: "My personal portfolio built with Next.js",
        image: "https://via.placeholder.com/600x400",
        tags: ["Next.js", "MongoDB", "Tailwind"],
        github: "https://github.com/khan-washim", // আপনার ইউজারনেম দিতে পারেন
        demo: "https://yoursite.com",
        featured: true,
        category: "fullstack"
      },
      {
        title: "E-Commerce App",
        description: "Full stack MERN e-commerce application",
        image: "https://via.placeholder.com/600x400",
        tags: ["React", "Node.js", "MongoDB"],
        github: "https://github.com/khan-washim", 
        demo: "https://demo.com",
        featured: true,
        category: "fullstack"
      },
      {
        title: "Todo App",
        description: "Simple todo app with authentication",
        image: "https://via.placeholder.com/600x400",
        tags: ["React", "Express"],
        github: "https://github.com/khan-washim", 
        demo: "https://todo.com",
        featured: false,
        category: "frontend"
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