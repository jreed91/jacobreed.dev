# New API Route

Create a new API route handler for jacobreed.dev using Next.js App Router conventions.

## Instructions

When the user requests a new API endpoint:

1. **Determine the route structure**:
   - API routes go in `/app/api/` directory
   - Use folder structure for URL paths
   - File must be named `route.ts` (Next.js convention)
   - Example: `/app/api/users/route.ts` → `/api/users`

2. **Choose HTTP methods to support**:
   - `GET` - Retrieve data
   - `POST` - Create data
   - `PUT`/`PATCH` - Update data
   - `DELETE` - Delete data
   - Export only the methods you need

3. **Route handler structure**:
   ```typescript
   import { NextRequest, NextResponse } from 'next/server';

   export async function GET(request: NextRequest) {
     try {
       // Handle GET request
       const data = { message: 'Success' };
       return NextResponse.json(data, { status: 200 });
     } catch (error) {
       console.error('Error:', error);
       return NextResponse.json(
         { error: 'Internal Server Error' },
         { status: 500 }
       );
     }
   }

   export async function POST(request: NextRequest) {
     try {
       const body = await request.json();
       // Validate and process body
       return NextResponse.json(
         { message: 'Created' },
         { status: 201 }
       );
     } catch (error) {
       console.error('Error:', error);
       return NextResponse.json(
         { error: 'Bad Request' },
         { status: 400 }
       );
     }
   }
   ```

4. **Best practices**:
   - Use try-catch for error handling
   - Return appropriate HTTP status codes
   - Validate input data
   - Use TypeScript types for request/response
   - Add error logging
   - Consider rate limiting for public APIs
   - Use environment variables for secrets

5. **Common patterns**:

   **Reading from database (Prisma)**:
   ```typescript
   import { NextResponse } from 'next/server';
   import prisma from '@/app/db/prisma';

   export async function GET() {
     try {
       const items = await prisma.projects.findMany();
       return NextResponse.json(items);
     } catch (error) {
       console.error('Database error:', error);
       return NextResponse.json(
         { error: 'Failed to fetch data' },
         { status: 500 }
       );
     }
   }
   ```

   **With query parameters**:
   ```typescript
   export async function GET(request: NextRequest) {
     const searchParams = request.nextUrl.searchParams;
     const id = searchParams.get('id');
     const limit = parseInt(searchParams.get('limit') || '10');

     // Use parameters...
   }
   ```

   **With dynamic route segments**:
   ```typescript
   // app/api/posts/[slug]/route.ts
   export async function GET(
     request: NextRequest,
     { params }: { params: { slug: string } }
   ) {
     const { slug } = params;
     // Use slug...
   }
   ```

   **Accepting POST data**:
   ```typescript
   export async function POST(request: NextRequest) {
     try {
       const body = await request.json();

       // Validate required fields
       if (!body.name || !body.email) {
         return NextResponse.json(
           { error: 'Missing required fields' },
           { status: 400 }
         );
       }

       // Process data...
       const result = await createUser(body);

       return NextResponse.json(result, { status: 201 });
     } catch (error) {
       return NextResponse.json(
         { error: 'Invalid request' },
         { status: 400 }
       );
     }
   }
   ```

6. **CORS (if needed for external access)**:
   ```typescript
   export async function GET(request: NextRequest) {
     const response = NextResponse.json({ data: 'value' });

     response.headers.set('Access-Control-Allow-Origin', '*');
     response.headers.set('Access-Control-Allow-Methods', 'GET, POST');

     return response;
   }
   ```

7. **Testing the route**:
   ```bash
   # GET request
   curl http://localhost:3000/api/your-route

   # POST request
   curl -X POST http://localhost:3000/api/your-route \
     -H "Content-Type: application/json" \
     -d '{"key": "value"}'

   # With query parameters
   curl "http://localhost:3000/api/your-route?id=123&limit=5"
   ```

## Full Example: Blog Views API

```typescript
// app/api/views/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const views = await prisma.views.findUnique({
      where: { slug },
    });

    return NextResponse.json({
      slug,
      views: views?.count || 0,
    });
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json(
      { error: 'Failed to fetch views' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const views = await prisma.views.upsert({
      where: { slug },
      create: { slug, count: 1 },
      update: { count: { increment: 1 } },
    });

    return NextResponse.json({
      slug,
      views: views.count,
    });
  } catch (error) {
    console.error('Error updating views:', error);
    return NextResponse.json(
      { error: 'Failed to update views' },
      { status: 500 }
    );
  }
}
```

## HTTP Status Codes

Use appropriate status codes:
- `200` - Success (GET, PUT, PATCH, DELETE)
- `201` - Created (POST)
- `204` - No Content (DELETE with no response body)
- `400` - Bad Request (invalid input)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error (unexpected errors)

## Security Considerations

- **Validate all inputs**
- **Sanitize user data**
- **Use environment variables for secrets**
- **Implement authentication if needed**
- **Add rate limiting for public APIs**
- **Use HTTPS in production**
- **Don't expose sensitive error details**

## Project-Specific Notes

- Prisma client is available at `@/app/db/prisma`
- Database schema is in `prisma/schema.prisma`
- Existing routes: `/api/projects`, `/api/views/[slug]`
- Use `NextResponse.json()` for JSON responses
- Log errors for debugging
- Consider caching for frequently accessed data

## TypeScript Types

Define types for better type safety:

```typescript
interface CreateProjectRequest {
  name: string;
  description: string;
  image: string;
  url?: string;
}

interface ApiError {
  error: string;
  details?: string;
}

export async function POST(request: NextRequest) {
  const body: CreateProjectRequest = await request.json();
  // TypeScript knows the shape of body
}
```

## Testing

Create tests for your routes:

```typescript
// app/api/your-route/route.test.ts
import { describe, it, expect } from 'vitest';
import { GET, POST } from './route';

describe('/api/your-route', () => {
  it('should return data on GET', async () => {
    const request = new Request('http://localhost:3000/api/your-route');
    const response = await GET(request);
    expect(response.status).toBe(200);
  });
});
```

## Deployment

- Routes are automatically deployed with the Next.js app
- Use environment variables for configuration
- Monitor API performance in Vercel dashboard
- Set up error tracking (e.g., Sentry) for production
