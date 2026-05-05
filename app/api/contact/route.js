import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    // Rate limiting: simple check - max 3 messages per email per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = await Message.countDocuments({
      email: email.toLowerCase().trim(),
      createdAt: { $gte: oneHourAgo },
    });

    if (recentCount >= 3) {
      return NextResponse.json(
        { success: false, error: 'Too many messages. Please wait before sending again.' },
        { status: 429 }
      );
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject?.trim() || 'No subject',
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
        id: newMessage._id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/contact]', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: false, error: 'Method not allowed' }, { status: 405 });
}
