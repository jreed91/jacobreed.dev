'use client'
import { fetcher } from "app/components/ViewCounter";
import Link from "next/link";
import useSWR from "swr";

interface Projects {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export default function Projects() {
  const { data: projects } = useSWR<Projects[]>(`/api/projects`, fetcher);

  return (
    <div className="max-w-4xl mx-auto w-full py-8 sm:py-12">
      <h1 className="mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
        All Projects
      </h1>
      {!projects ? (
        <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No projects found.</p>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => (
            <Link
              href={project.slug}
              key={project.slug}
              className="block group"
            >
              <article className="w-full transform hover:scale-[1.01] transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <h2 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {project.name}
                  </h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 flex-shrink-0 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors"
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
                <p className="mt-2 text-gray-600 dark:text-gray-400">
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

