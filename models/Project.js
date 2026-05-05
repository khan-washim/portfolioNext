import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxLength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxLength: [500, 'Description cannot exceed 500 characters'],
    },
    longDescription: {
      type: String,
      maxLength: [2000, 'Long description cannot exceed 2000 characters'],
    },
    techStack: {
      type: [String],
      required: [true, 'At least one technology is required'],
    },
    liveLink: {
      type: String,
      default: '',
    },
    githubLink: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Web App', 'Mobile', 'API', 'Tool', 'Open Source', 'Other'],
      default: 'Web App',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Completed', 'In Progress', 'Archived'],
      default: 'Completed',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model re-registration during hot reload
const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
