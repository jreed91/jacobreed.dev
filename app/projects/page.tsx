'use client'
import Link from "next/link";
import useSWR from "swr";

interface Projects {
  slug: string;
  name: string;
  description: string;
  image: string;
}

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

/* Code & Craft Projects Page - Clean cards, consistent spacing */
export default function Projects() {
  const { data: projects } = useSWR<Projects[]>(`/api/projects`, fetcher);

  return (
    <div className="max-w-[1200px] mx-auto w-full py-xl sm:py-2xl px-10">
      <h1 className="mb-lg text-h2 text-cc-slate dark:text-cc-white">
        All Projects
      </h1>
      {!projects ? (
        <p className="text-body text-cc-warm-gray dark:text-cc-soft-gray">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-body text-cc-warm-gray dark:text-cc-soft-gray">No projects found.</p>
      ) : (
        <div className="space-y-md">
          {projects.map((project) => (
            <Link
              href={project.slug}
              key={project.slug}
              className="block group"
            >
              <article className="w-full border-b border-cc-border dark:border-cc-slate pb-md transition-colors hover:border-cc-sage-blue dark:hover:border-cc-sky-blue">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <h2 className="text-h3 text-cc-slate dark:text-cc-white group-hover:text-cc-sage-blue dark:group-hover:text-cc-sky-blue transition-colors">
                    {project.name}
                  </h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 flex-shrink-0 text-cc-warm-gray dark:text-cc-soft-gray group-hover:text-cc-sage-blue dark:group-hover:text-cc-sky-blue transition-colors"
                    aria-hidden="true"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                    />
                  </svg>
                </div>
                <p className="mt-sm text-body text-cc-warm-gray dark:text-cc-soft-gray">
                  {project.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

