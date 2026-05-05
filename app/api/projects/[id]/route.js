import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const project = await Project.findById(params.id).lean();

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project });
  } catch (err) {
    console.error('[GET /api/projects/:id]', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    // Normalize techStack if it's a string
    if (typeof body.techStack === 'string') {
      body.techStack = body.techStack.split(',').map((t) => t.trim()).filter(Boolean);
    }

    const project = await Project.findByIdAndUpdate(
      params.id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project });
  } catch (err) {
    console.error('[PUT /api/projects/:id]', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const project = await Project.findByIdAndDelete(params.id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (err) {
    console.error('[DELETE /api/projects/:id]', err);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
