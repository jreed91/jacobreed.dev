import { parseISO, format } from 'date-fns';
import { getTalks } from 'app/db/talks';
import {
  ogImageContentType,
  ogImageSize,
  renderOgCard,
} from 'app/utils/ogCard';

export const alt = 'Talk by Jacob Reed';

export async function generateStaticParams() {
  return getTalks().map((talk) => ({ slug: talk.slug }));
}

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const talk = getTalks().find((talk) => talk.slug === slug);

  if (!talk) {
    return renderOgCard({ eyebrow: 'Talk', title: 'Jacob Reed' });
  }

  const meta = [talk.metadata.event, format(parseISO(talk.metadata.date), 'MMMM d, yyyy')]
    .filter(Boolean)
    .join(' • ');

  return renderOgCard({
    eyebrow: 'Talk',
    title: talk.metadata.title,
    meta,
  });
}
