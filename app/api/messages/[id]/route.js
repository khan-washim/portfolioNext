import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();

    const message = await Message.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const message = await Message.findByIdAndDelete(params.id);

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
