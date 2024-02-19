import prisma from "../../../db/prisma";

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const newOrUpdatedViews = await prisma.views.upsert({
    where: { slug },
    create: {
      slug,
    },
    update: {
      count: {
        increment: 1,
      },
    },
  });

  return new Response(
    JSON.stringify({
      total: newOrUpdatedViews.count.toString(),
    }),
    { status: 200 }
  );
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const views = await prisma.views.findUnique({
    where: {
      slug,
    },
  });

  if (!views) {
    return new Response(JSON.stringify({ error: "View not found" }), {
      status: 404,
    });
  } else {
    return new Response(
      JSON.stringify({
        total: views.count.toString(),
      }),
      { status: 200 }
    );
  }
}
