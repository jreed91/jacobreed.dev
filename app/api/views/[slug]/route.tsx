// Using in-memory storage for views instead of Prisma since DATABASE_URL is not configured
const viewsMap = new Map<string, number>();

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  
  // Update view count
  const currentViews = viewsMap.get(slug) || 0;
  viewsMap.set(slug, currentViews + 1);
  
  return new Response(
    JSON.stringify({
      total: (currentViews + 1).toString(),
    }),
    { status: 200 }
  );
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const viewCount = viewsMap.get(slug);

  if (viewCount === undefined) {
    // Initialize with 0 views if not found
    viewsMap.set(slug, 0);
    
    return new Response(
      JSON.stringify({
        total: "0",
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        total: viewCount.toString(),
      }),
      { status: 200 }
    );
  }
}
