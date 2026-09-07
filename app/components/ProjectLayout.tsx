import { Project, techTags } from 'app/db/projects';
import { CustomMDX } from './Mdx';
import Screenshot from './Screenshot';

export default function ProjectLayout({ project }: { project: Project }) {
  const tech = techTags(project);

  return (
    <div className="w-full max-w-4xl mx-auto mb-16">
      <article className="flex flex-col items-start justify-center w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {project.metadata.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {project.metadata.summary}
        </p>
        {project.metadata.platform && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {project.metadata.platform}
          </p>
        )}
        {tech.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-4 list-none p-0">
            {tech.map((tag) => (
              <li
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        {project.metadata.repo && (
          <a
            href={project.metadata.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm text-gray-700 underline dark:text-gray-300"
          >
            {'View on GitHub'}
          </a>
        )}
        <div className="w-full mt-8 prose prose-gray dark:prose-invert max-w-none">
          <CustomMDX source={project.content} components={{ Screenshot }} />
        </div>
      </article>
    </div>
  );
}
