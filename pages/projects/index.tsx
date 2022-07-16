import { allBlogs } from ".contentlayer/data";
import { Blog } from ".contentlayer/types";
import { pick } from "contentlayer/client";
import Link from "next/link";
import useSWR from "swr";
import Container from "../../components/Container";
import { fetcher } from "../../components/ViewCounter";

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
  const { data } = useSWR<Response>(`/api/projects/handler`, fetcher);
  const projects = data?.projects;

  return (
    <Container>
      <div className="items-center justify-between w-full relative max-w-4xl mx-auto">
      <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          All Projects
        </h3>
        {projects?.map((project) => (
          <Link href={`${project.slug}`} key={project.slug}>
            <a className="w-full ">
              <div className="w-full mb-8 transform hover:scale-[1.01] transition-all">
                <div className="flex flex-col justify-between md:flex-row">
                  <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
                    {project.name}
                  </h4>
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 ml-1"
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
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = allBlogs.map((post) =>
    pick(post, ["slug", "title", "summary", "date"])
  );

  return { props: { posts } };
}
