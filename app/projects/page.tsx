import Link from 'next/link';
import { getProjects, techTags } from 'app/db/projects';
import { candyStyle } from 'app/utils/candy';
import PageHeader from 'app/components/PageHeader';

export default function Projects() {
  const projects = getProjects();

  return (
    <div className="max-w-4xl mx-auto w-full py-8 sm:py-12">
      <PageHeader eyebrow="projects" title="Projects">
        Apps I designed, built and shipped end to end. Each one started from a constraint
        worth taking seriously — no signal, a plan that breaks, two people editing the same
        list — and the write-ups are about the decisions that came out of it.
      </PageHeader>
      {projects.length === 0 ? (
        <p className="text-muted">No projects found.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Link
              href={`/projects/${encodeURIComponent(project.slug)}`}
              key={project.slug}
              className="block group"
            >
              <article className="w-full card-surface p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-ink group-hover:text-accent transition-colors">
                    {project.metadata.title}
                  </h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="hidden sm:block h-6 w-6 flex-shrink-0 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
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
                {project.metadata.platform && (
                  <p className="mt-1 text-sm text-muted">
                    {project.metadata.platform}
                  </p>
                )}
                <p className="mt-2 text-ink-soft">
                  {project.metadata.summary}
                </p>
                {techTags(project).length > 0 && (
                  <ul className="flex flex-wrap gap-2 mt-3 list-none p-0">
                    {techTags(project)
                      .slice(0, 4)
                      .map((tag) => (
                        <li key={tag} className="tag-pill" style={candyStyle(tag)}>
                          {tag}
                        </li>
                      ))}
                  </ul>
                )}
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
