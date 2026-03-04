import TalkCard from '../components/TalkCard';
import { getTalks } from 'app/db/talks';

export default function Talks() {
  const talks = getTalks().sort(
    (a, b) =>
      Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
  );

  return (
    <div className="max-w-4xl mx-auto w-full py-8 sm:py-12">
      <h1 className="mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
        Talks
      </h1>
      {!talks.length ? (
        <p className="text-gray-600 dark:text-gray-400">No talks found.</p>
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
