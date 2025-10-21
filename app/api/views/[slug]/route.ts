// Using in-memory storage for views instead of Prisma since DATABASE_URL is not configured
const viewsMap = new Map<string, number>();

import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  context: any
) {
  const { params } = context as { params: Promise<{ slug: string }> };
  const { slug } = await params;

  // Update view count
  const currentViews = viewsMap.get(slug) || 0;
  viewsMap.set(slug, currentViews + 1);

  return NextResponse.json(
    { total: currentViews + 1 },
    { status: 200 }
  );
}

export async function GET(
  request: NextRequest,
  context: any
) {
  const { params } = context as { params: Promise<{ slug: string }> };
  const { slug } = await params;
  const viewCount = viewsMap.get(slug);

  if (viewCount === undefined) {
    // Initialize with 0 views if not found
    viewsMap.set(slug, 0);

    return NextResponse.json({ total: 0 }, { status: 200 });
  } else {
    return NextResponse.json({ total: viewCount }, { status: 200 });
  }
}
