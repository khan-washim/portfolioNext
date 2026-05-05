import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxLength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    subject: {
      type: String,
      trim: true,
      maxLength: [150, 'Subject cannot exceed 150 characters'],
      default: 'No subject',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxLength: [2000, 'Message cannot exceed 2000 characters'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    replied: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message =
  mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message;
