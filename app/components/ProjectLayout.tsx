import { Project, techTags } from 'app/db/projects';
import { candyStyle } from 'app/utils/candy';
import ArticleHeader from './ArticleHeader';
import { CustomMDX } from './Mdx';
import Screenshot from './Screenshot';

export default function ProjectLayout({ project }: { project: Project }) {
  const tech = techTags(project);

  return (
    <div className="w-full max-w-4xl mx-auto pt-8 sm:pt-12 mb-16">
      <article className="flex flex-col items-start justify-center w-full">
        <ArticleHeader
          section="Projects"
          sectionHref="/projects"
          title={project.metadata.title}
        >
          <p className="max-w-2xl text-lg text-ink-soft">
            {project.metadata.summary}
          </p>
          {(project.metadata.platform || project.metadata.role) && (
            <p className="text-sm text-muted">
              {[project.metadata.platform, project.metadata.role]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
          {tech.length > 0 && (
            <ul className="flex flex-wrap gap-2 list-none p-0" aria-label="Tech">
              {tech.map((tag) => (
                <li key={tag} className="tag-pill" style={candyStyle(tag)}>
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] border border-line text-sm font-semibold text-ink-soft hover:border-line-strong hover:text-ink transition-colors"
            >
              {'View on GitHub'}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </ArticleHeader>
        <div className="w-full prose prose-brand max-w-none">
          <CustomMDX source={project.content} components={{ Screenshot }} />
        </div>
      </article>
    </div>
  );
}
