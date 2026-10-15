import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { type PropsWithChildren } from 'react';
import { Talk, getYouTubeEmbedUrl } from 'app/db/talks';
import ArticleHeader from './ArticleHeader';
import { CustomMDX } from './Mdx';

export default function TalkLayout({
  talk,
}: PropsWithChildren<{ talk: Talk }>) {
  const embedUrl = getYouTubeEmbedUrl(talk.metadata.videoUrl);

  return (
    <div className="w-full max-w-4xl mx-auto pt-8 sm:pt-12 mb-16">
      <article className="flex flex-col items-start justify-center w-full">
        <ArticleHeader section="Talks" sectionHref="/talks" title={talk.metadata.title}>
          <div className="flex items-center gap-2">
            <Image
              alt="Jacob Reed"
              height={28}
              width={28}
              src="/static/images/avatar.jpeg"
              className="rounded-full"
            />
            <p className="text-sm text-muted">
              <span className="font-semibold text-ink-soft">Jacob Reed</span>
              {' · '}
              {format(parseISO(talk.metadata.date), 'MMMM d, yyyy')}
              {talk.metadata.event && ` · ${talk.metadata.event}`}
            </p>
          </div>
        </ArticleHeader>
        {embedUrl && (
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-line bg-sunken">
            <iframe
              src={embedUrl}
              title={talk.metadata.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}
        {talk.content && (
          <div className="w-full mt-8 prose prose-brand max-w-none">
            <CustomMDX source={talk.content} />
          </div>
        )}
      </article>
    </div>
  );
}
