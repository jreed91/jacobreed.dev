import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { type PropsWithChildren } from 'react';
import { Talk, getYouTubeEmbedUrl } from 'app/db/talks';
import { CustomMDX } from './Mdx';

export default function TalkLayout({
  talk,
}: PropsWithChildren<{ talk: Talk }>) {
  const embedUrl = getYouTubeEmbedUrl(talk.metadata.videoUrl);

  return (
    <div className="w-full max-w-4xl mx-auto mb-16">
      <article className="flex flex-col items-start justify-center w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {talk.metadata.title}
        </h1>
        <div className="flex items-center mt-2">
          <Image
            alt="Jacob Reed"
            height={24}
            width={24}
            src="/static/images/avatar.jpeg"
            className="rounded-full"
          />
          <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {'Jacob Reed / '}
            {format(parseISO(talk.metadata.date), 'MMMM dd, yyyy')}
            {talk.metadata.event && ` • ${talk.metadata.event}`}
          </p>
        </div>
        <div className="w-full mt-8 aspect-video rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            title={talk.metadata.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        {talk.content && (
          <div className="w-full mt-8 prose prose-gray dark:prose-invert max-w-none">
            <CustomMDX source={talk.content} />
          </div>
        )}
      </article>
    </div>
  );
}
