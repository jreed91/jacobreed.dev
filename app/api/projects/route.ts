import prisma from '../../db/prisma';

export async function GET() {
    const projects = await prisma.projects.findMany();

    return new Response(JSON.stringify(projects));
}
