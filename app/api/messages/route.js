import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const read = searchParams.get('read');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;

    const query = {};
    if (read === 'false') query.read = false;
    if (read === 'true') query.read = true;

    const [messages, total, unreadCount] = await Promise.all([
      Message.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),
      Message.countDocuments(query),
      Message.countDocuments({ read: false }),
    ]);

    return NextResponse.json({
      success: true,
      messages,
      total,
      unreadCount,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('[GET /api/messages]', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
