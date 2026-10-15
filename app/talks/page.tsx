import PageHeader from '../components/PageHeader';
import TalkCard from '../components/TalkCard';
import { getTalks } from 'app/db/talks';

export default function Talks() {
  const talks = getTalks().sort(
    (a, b) =>
      Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
  );

  return (
    <div className="max-w-4xl mx-auto w-full py-8 sm:py-12">
      <PageHeader eyebrow="talks" title="Talks">
        Talks I&apos;ve given on developer tooling and how teams ship software.
      </PageHeader>
      {!talks.length ? (
        <p className="text-muted">No talks found.</p>
      ) : (
        <div className="space-y-4">
          {talks.map((talk) => (
            <TalkCard key={talk.slug} talk={talk} />
          ))}
        </div>
      )}
    </div>
  );
}
