import { Project, techTags } from 'app/db/projects';
import { CustomMDX } from './Mdx';
import Screenshot from './Screenshot';

export default function ProjectLayout({ project }: { project: Project }) {
  const tech = techTags(project);

  return (
    <div className="w-full max-w-4xl mx-auto mb-16">
      <article className="flex flex-col items-start justify-center w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-ink md:text-5xl">
          {project.metadata.title}
        </h1>
        <p className="text-lg text-muted">
          {project.metadata.summary}
        </p>
        {(project.metadata.platform || project.metadata.role) && (
          <p className="mt-3 text-sm text-muted">
            {[project.metadata.platform, project.metadata.role]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
        {tech.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-4 list-none p-0">
            {tech.map((tag) => (
              <li
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-sunken text-ink-soft"
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
            className="mt-4 text-sm text-ink-soft underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            {'View on GitHub'}
          </a>
        )}
        <div className="w-full mt-8 prose prose-brand max-w-none">
          <CustomMDX source={project.content} components={{ Screenshot }} />
        </div>
      </article>
    </div>
  );
}
