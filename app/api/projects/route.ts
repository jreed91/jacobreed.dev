import { getProjects } from 'app/db/projects';

// Served from content/projects rather than Prisma since there's no DATABASE_URL configured
export async function GET() {
    const projects = getProjects().map((project) => ({
        slug: project.slug,
        name: project.metadata.title,
        description: project.metadata.summary,
        image: project.metadata.image ?? '/static/images/avatar.jpeg',
    }));

    return new Response(JSON.stringify(projects));
}
