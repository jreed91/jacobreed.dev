import { ReactNode } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from 'app/components/PageHeader';
import { strideContactEmail } from '../contact';

export const metadata: Metadata = {
  title: 'Stride Support',
  description: 'Help and answers for the Stride running app.',
  alternates: { canonical: '/stride/support' },
};

const questions: { question: string; answer: ReactNode }[] = [
  {
    question: 'Do I need an account?',
    answer:
      'No. Sign in with Apple is optional. Your training lives on your iPhone and, if iCloud is on, in your own private iCloud.',
  },
  {
    question: "Why isn't my run from another app showing up?",
    answer:
      "Stride imports runs from Apple Health. Open the Settings app → Health → Data Access & Devices → Stride and turn on Workouts and Heart Rate. Then open Stride's History tab and pull down to refresh.",
  },
  {
    question: "The Stride Watch app isn't showing my plan.",
    answer:
      'Open Stride on your iPhone once so it can send your next session to the Watch, and keep the two paired and nearby. Today\'s session shows a Start button; other days show what is coming up.',
  },
  {
    question: "The AI coach says it's unavailable.",
    answer:
      "The coach uses Apple Intelligence, which needs a supported iPhone with Apple Intelligence turned on in Settings → Apple Intelligence & Siri, and the AI Coach switch on in Stride's Settings. Without it, Stride still shows an analysis of each run worked out on your phone.",
  },
  {
    question: 'GPS stops recording when my phone is locked.',
    answer:
      'Allow location "While Using the App" for Stride. Stride keeps recording in the background during a run you started. Low Power Mode can reduce GPS accuracy.',
  },
  {
    question: 'How do I get a run into Strava or Garmin Connect?',
    answer:
      "Open the run, tap Share, and choose Export route as GPX. Send the file to the other app from the share sheet, or upload it on that service's website.",
  },
  {
    question: 'How do I move my data to a new iPhone?',
    answer:
      'Turn on iCloud for Stride on both phones (Settings → your name → iCloud → Apps Using iCloud). Your plan and runs sync automatically. You can also export everything from Stride → Settings → Export All Data.',
  },
  {
    question: 'How do I delete my data?',
    answer:
      'Stride → Settings → Reset All Data deletes your plan, runs and settings from this iPhone and from your iCloud. Runs you saved to Apple Health stay in Apple Health; delete them there if you want.',
  },
  {
    question: 'Is Stride medical advice?',
    answer:
      'No. Stride gives training guidance. Check with a doctor before starting a new exercise program, especially if you are pregnant, injured or have a health condition.',
  },
];

export default function StrideSupport() {
  return (
    <div className="max-w-4xl mx-auto w-full py-8 sm:py-12">
      <PageHeader eyebrow="stride" title="Support">
        Stride is a running coach for iPhone and Apple Watch. If something
        isn&apos;t working, or you have an idea, email{' '}
        <a className="text-accent" href={`mailto:${strideContactEmail}`}>
          {strideContactEmail}
        </a>
        . Include your iPhone model and iOS version.
      </PageHeader>
      <div className="max-w-2xl border-b border-line">
        {questions.map(({ question, answer }) => (
          <details key={question} className="group border-t border-line py-4">
            <summary className="cursor-pointer font-semibold text-ink">
              {question}
            </summary>
            <p className="mt-2 text-ink-soft">{answer}</p>
          </details>
        ))}
      </div>
      <p className="mt-10 text-muted">
        <Link className="text-accent" href="/stride/privacy">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
