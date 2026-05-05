import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit')) || 100;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;

    const query = {};
    if (featured === 'true') query.featured = true;
    if (category) query.category = category;

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ featured: -1, order: 1, createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),
      Project.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      projects,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error('[GET /api/projects]', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      title, description, longDescription, techStack,
      liveLink, githubLink, imageUrl, category, featured, status, order,
    } = body;

    // Basic validation
    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Normalize techStack
    let stack = techStack;
    if (typeof techStack === 'string') {
      stack = techStack.split(',').map((t) => t.trim()).filter(Boolean);
    }

    if (!stack || stack.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one technology is required' },
        { status: 400 }
      );
    }

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      longDescription: longDescription?.trim(),
      techStack: stack,
      liveLink: liveLink?.trim() || '',
      githubLink: githubLink?.trim() || '',
      imageUrl: imageUrl?.trim() || '',
      category: category || 'Web App',
      featured: Boolean(featured),
      status: status || 'Completed',
      order: order || 0,
    });

    return NextResponse.json(
      { success: true, project },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/projects]', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
