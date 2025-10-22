# Add Project to Database

Add a new project entry to the jacobreed.dev database using Prisma.

## Instructions

When the user requests to add a project:

1. **Gather required information**:
   - `slug`: Unique identifier (kebab-case, e.g., "my-awesome-project")
   - `name`: Project display name
   - `description`: Brief description of the project
   - `image`: URL to project image/screenshot

2. **Read the Prisma schema** to understand the project model structure:
   - Located at: `prisma/schema.prisma`
   - Check current fields and constraints

3. **Create a database script** or use Prisma Studio:

   **Option A: Create a seed script**
   ```typescript
   // prisma/add-project.ts
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient();

   async function main() {
     const project = await prisma.projects.create({
       data: {
         slug: 'project-slug',
         name: 'Project Name',
         description: 'Project description',
         image: '/images/project.png',
       },
     });

     console.log('Created project:', project);
   }

   main()
     .catch((e) => {
       console.error(e);
       process.exit(1);
     })
     .finally(async () => {
       await prisma.$disconnect();
     });
   ```

   **Option B: Use direct Prisma query** (if user prefers quick addition)

4. **Verify the project data**:
   - Ensure slug is unique and follows kebab-case convention
   - Verify image path/URL is correct and accessible
   - Check description is concise and informative

5. **Execute the script**:
   ```bash
   npx tsx prisma/add-project.ts
   ```

6. **Verify the addition**:
   - Check that the project appears in the database
   - Test the `/api/projects` endpoint to ensure it returns the new project
   - Verify the project displays correctly on the projects page

7. **Clean up** (if using temporary script):
   - Remove or archive the temporary script
   - Or keep it as a reusable template

## Database Schema Reference

The `projects` table structure (from schema.prisma):
```prisma
model projects {
  slug        String @id @db.VarChar(128)
  name        String @db.VarChar(256)
  description String @db.VarChar(512)
  image       String @db.VarChar(256)
}
```

## Example Workflow

```bash
# 1. Create the script
cat > prisma/add-project.ts << 'EOF'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.projects.create({
    data: {
      slug: 'react-dashboard',
      name: 'React Analytics Dashboard',
      description: 'A real-time analytics dashboard built with React, TypeScript, and D3.js',
      image: '/images/projects/react-dashboard.png',
    },
  });

  console.log('Created project:', project);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
EOF

# 2. Run the script
npx tsx prisma/add-project.ts

# 3. Verify via API
curl http://localhost:3000/api/projects

# 4. Clean up
rm prisma/add-project.ts
```

## Notes

- Ensure the `DATABASE_URL` environment variable is set
- The slug must be unique (primary key)
- Image paths should be relative to the public directory or absolute URLs
- Character limits: slug (128), name (256), description (512), image (256)
- Consider creating a backup before modifying the database
- Projects are fetched via `/api/projects` endpoint
- The projects page uses SWR for client-side data fetching

## Alternative: Prisma Studio

For a GUI approach, use Prisma Studio:
```bash
npx prisma studio
```
Then manually add the project through the web interface.
