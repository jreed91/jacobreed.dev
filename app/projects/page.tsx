'use client'
import { fetcher } from "app/components/ViewCounter";
import Link from "next/link";
import useSWR from "swr";

interface Response {
  projects: Projects[];
}
interface Projects {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export default function Projects() {
  const { data } = useSWR<Projects[]>(`/api/projects`, fetcher);
  const projects = data;
  
  return (
      <div className="flex flex-col space-y-6 w-full relative max-w-4xl mx-auto px-8">
      <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          All Projects
        </h3>
        {projects?.map((project) => (
          <Link href={`${project.slug}`} key={project.slug} className="w-full">
              <div className="w-full mb-8 transform hover:scale-[1.01] transition-all rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 p-4">
                <div className="flex items-center justify-between w-full">
                  <h4 className="text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100">
                    {project.name}
                  </h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 ml-2 shrink-0"
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
                <p className="text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
              </div>
          </Link>
        ))}
      </div>
  );
}

