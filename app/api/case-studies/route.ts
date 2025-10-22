// Mock case studies data showcasing various technical challenges and solutions
export async function GET() {
    const mockCaseStudies = [
        {
            slug: "performance-optimization-ecommerce",
            name: "E-Commerce Platform Performance Optimization",
            problem: "A high-traffic e-commerce site was experiencing slow page loads (5-8 seconds) and cart abandonment rates had increased to 45%. The checkout process was particularly slow, causing significant revenue loss during peak shopping periods.",
            solution: "Implemented a multi-pronged optimization strategy: 1) Migrated to Next.js 14 with App Router for improved SSR and streaming, 2) Implemented React Server Components to reduce client-side JavaScript by 60%, 3) Added Redis caching layer for product data, 4) Optimized images with next/image and WebP format, 5) Implemented code splitting and lazy loading for non-critical components.",
            outcome: "Reduced initial page load time from 5.8s to 1.2s (79% improvement). Cart abandonment decreased to 28%, resulting in a 23% increase in conversion rate. Lighthouse performance score improved from 42 to 94.",
            tech_used: JSON.stringify(["Next.js 14", "React Server Components", "Redis", "TypeScript", "Vercel", "WebP"]),
            metrics: "79% faster load time • 23% conversion increase • 60% less JS shipped",
            year: 2024,
            company: null,
            category: "Performance",
            image: "/static/images/avatar.jpeg"
        },
        {
            slug: "microservices-migration",
            name: "Monolith to Microservices Migration",
            problem: "A legacy monolithic Node.js application had become difficult to maintain and scale. Deployment took 45+ minutes, and a bug in one module would bring down the entire system. The team of 15 developers faced constant merge conflicts and slow CI/CD pipelines.",
            solution: "Designed and executed a phased migration strategy: 1) Identified bounded contexts and created a service dependency map, 2) Extracted authentication service first as a proof-of-concept, 3) Implemented event-driven architecture using RabbitMQ for inter-service communication, 4) Set up Docker containers with Kubernetes orchestration, 5) Migrated services incrementally over 6 months while maintaining zero downtime.",
            outcome: "Successfully decomposed monolith into 8 microservices. Deployment time reduced to 8 minutes per service. System uptime improved from 97.2% to 99.7%. Development velocity increased by 40% with teams able to deploy independently.",
            tech_used: JSON.stringify(["Node.js", "TypeScript", "Docker", "Kubernetes", "RabbitMQ", "PostgreSQL", "Redis", "AWS"]),
            metrics: "8 microservices • 82% faster deployments • 99.7% uptime • 40% dev velocity increase",
            year: 2023,
            company: "TechCorp",
            category: "Architecture",
            image: "/static/images/avatar.jpeg"
        },
        {
            slug: "real-time-analytics-dashboard",
            name: "Real-Time Analytics Dashboard for 100K+ Users",
            problem: "Product team needed real-time insights into user behavior, but the existing analytics solution had a 2-hour data lag and couldn't handle concurrent dashboard users. The PostgreSQL database was maxing out at 80% CPU during peak hours with complex analytical queries.",
            solution: "Built a modern real-time analytics pipeline: 1) Implemented event streaming with Kafka to capture user actions, 2) Used ClickHouse for columnar storage optimized for analytical queries, 3) Created materialized views for common dashboard queries, 4) Built frontend with React and TanStack Query for efficient data fetching, 5) Added WebSocket support for live dashboard updates.",
            outcome: "Achieved sub-second query response times for dashboards serving 100K+ daily active users. Data latency reduced from 2 hours to <5 seconds. Database CPU usage decreased to 35% even during peak traffic. Product team now makes data-driven decisions in real-time.",
            tech_used: JSON.stringify(["React", "TypeScript", "Kafka", "ClickHouse", "WebSockets", "TanStack Query", "Node.js"]),
            metrics: "100K+ DAU • <5s data latency • <1s query response • 45% lower DB load",
            year: 2024,
            company: null,
            category: "Full Stack",
            image: "/static/images/avatar.jpeg"
        },
        {
            slug: "ci-cd-pipeline-automation",
            name: "CI/CD Pipeline Overhaul and Test Automation",
            problem: "The development team's CI/CD pipeline was unreliable with a 35% failure rate on master branch builds. Tests took 45 minutes to run, and developers often skipped running the full test suite locally. Manual QA was a bottleneck, with releases taking 2-3 days.",
            solution: "Redesigned the entire CI/CD workflow: 1) Migrated from Jenkins to GitHub Actions for better developer experience, 2) Parallelized test execution across multiple runners, reducing test time by 70%, 3) Implemented smart test selection to run only affected tests on PRs, 4) Added automated E2E testing with Playwright, 5) Created preview deployments for every PR using Vercel, 6) Set up automatic rollback on failed health checks.",
            outcome: "Build reliability improved to 98% success rate. Test execution time dropped from 45 to 12 minutes. Release cycle shortened from 2-3 days to same-day deployments. Developer satisfaction increased significantly with faster feedback loops and preview environments.",
            tech_used: JSON.stringify(["GitHub Actions", "Vitest", "Playwright", "Docker", "Vercel", "TypeScript"]),
            metrics: "98% build success • 73% faster tests • Same-day releases • Zero-downtime deployments",
            year: 2023,
            category: "DevOps",
            image: "/static/images/avatar.jpeg"
        },
        {
            slug: "accessibility-compliance-overhaul",
            name: "WCAG 2.1 AA Accessibility Compliance",
            problem: "A SaaS product serving enterprise clients failed an accessibility audit with 87 WCAG violations, putting several major contracts at risk. The application lacked keyboard navigation, screen reader support, and proper color contrast. Legal compliance deadline was 3 months away.",
            solution: "Executed a comprehensive accessibility remediation: 1) Conducted automated accessibility testing with axe-core and Pa11y integrated into CI/CD, 2) Implemented semantic HTML and ARIA labels throughout the application, 3) Ensured full keyboard navigation with visible focus indicators, 4) Fixed color contrast issues and added dark mode with proper contrast ratios, 5) Added screen reader testing to QA process, 6) Trained development team on accessibility best practices.",
            outcome: "Achieved WCAG 2.1 AA compliance with zero violations in final audit. Retained all enterprise contracts worth $2M+ ARR. Improved user experience for all users, not just those using assistive technologies. Accessibility violations now caught in CI before reaching production.",
            tech_used: JSON.stringify(["React", "TypeScript", "axe-core", "Pa11y", "Jest", "Tailwind CSS"]),
            metrics: "0 WCAG violations • $2M+ contracts retained • 100% keyboard accessible • 4.5:1 contrast ratio",
            year: 2024,
            company: "Enterprise SaaS Inc",
            category: "Frontend",
            image: "/static/images/avatar.jpeg"
        }
    ];

    return new Response(JSON.stringify(mockCaseStudies), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
