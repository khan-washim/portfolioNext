import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Message from '@/models/Message';

export async function GET() {
  try {
    await connectDB();

    const [
      totalProjects,
      featuredProjects,
      totalMessages,
      unreadMessages,
      projectsByCategory,
      recentMessages,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
      Project.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Message.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalProjects,
        featuredProjects,
        totalMessages,
        unreadMessages,
        projectsByCategory,
        recentMessages,
      },
    });
  } catch (err) {
    console.error('[GET /api/stats]', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
