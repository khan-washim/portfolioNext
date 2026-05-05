import connectDB from '../lib/mongodb.js';
import mongoose from 'mongoose';

process.env.MONGODB_URI
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
  await mongoose.connect(MONGODB_URI);
  console.log('Connected!');

  await Project.insertMany([
    {
      title: "Portfolio Website",
      description: "My personal portfolio built with Next.js",
      image: "https://via.placeholder.com/600x400",
      tags: ["Next.js", "MongoDB", "Tailwind"],
      github: "https://github.com/yourrepo",
      demo: "https://yoursite.com",
      featured: true,
      category: "fullstack"
    },
    {
      title: "E-Commerce App",
      description: "Full stack MERN e-commerce application",
      image: "https://via.placeholder.com/600x400",
      tags: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/yourrepo2",
      demo: "https://demo.com",
      featured: true,
      category: "fullstack"
    },
    {
      title: "Todo App",
      description: "Simple todo app with authentication",
      image: "https://via.placeholder.com/600x400",
      tags: ["React", "Express"],
      github: "https://github.com/yourrepo3",
      demo: "https://todo.com",
      featured: false,
      category: "frontend"
    }
  ]);

  console.log('✅ Projects inserted!');
  process.exit(0);
}

seed();