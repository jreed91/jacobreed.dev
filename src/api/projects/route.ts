// We'll return mock data instead of using Prisma since there's no DATABASE_URL configured
export async function GET() {
    const mockProjects = [
        {
            slug: "project-1",
            name: "Project 1",
            description: "A sample project description",
            image: "/static/images/avatar.jpeg"
        },
        {
            slug: "project-2",
            name: "Project 2",
            description: "Another sample project description",
            image: "/static/images/avatar.jpeg"
        }
    ];

    return new Response(JSON.stringify(mockProjects));
}
