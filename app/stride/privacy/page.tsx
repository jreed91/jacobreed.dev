import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from 'app/components/PageHeader';
import { strideContactEmail } from '../contact';

export const metadata: Metadata = {
  title: 'Stride Privacy Policy',
  description:
    'How the Stride running app handles your training, health and location data.',
  alternates: { canonical: '/stride/privacy' },
};

export default function StridePrivacy() {
  return (
    <div className="max-w-4xl mx-auto w-full py-8 sm:py-12">
      <PageHeader eyebrow="stride" title="Privacy Policy">
        Effective 17 October 2026
      </PageHeader>
      <article className="w-full prose prose-brand max-w-2xl">
        <p>
          Stride is built so that your training data stays yours. I (Jacob
          Reed, the developer) do not run servers that store your data, I do not
          sell or share it, and the app contains no advertising, analytics or
          tracking.
        </p>

        <h2>What Stride uses, and where it stays</h2>
        <ul>
          <li>
            <strong>Your runs, plan and profile</strong> (age, goal race, paces,
            workouts, routes, heart rate recorded during runs, strength
            sessions, shoes) are stored on your iPhone. If iCloud is on, they
            sync through your own private iCloud database, which Apple encrypts
            and I cannot access.
          </li>
          <li>
            <strong>Apple Health.</strong> With your permission Stride reads
            workouts, heart rate, heart-rate variability, resting heart rate,
            sleep, steps, distance and body weight to import runs and show
            training and recovery insights. It writes your completed runs and
            strength sessions as workouts, with their distance, heart rate and
            route. Health data is never used for advertising and never shared
            with me or anyone else.
          </li>
          <li>
            <strong>Location</strong> is used while you record a run, including
            in the background once you start one, to draw your route and measure
            distance and pace, and to fetch the weather for your run and race.
          </li>
          <li>
            <strong>Motion</strong> data measures cadence during runs.
          </li>
          <li>
            <strong>Apple Watch.</strong> The Stride Watch app shows your next
            session, weekly goal, streak and race, and can start today&apos;s
            workout. Your iPhone sends that to your Watch directly; it does not
            pass through any server of mine.
          </li>
          <li>
            <strong>Apple Music</strong>, if you choose, lets Stride save a
            playlist for a run to your library.
          </li>
          <li>
            <strong>Sign in with Apple</strong> is optional. Stride asks for no
            name or email and keeps only an anonymous identifier on your device.
          </li>
          <li>
            <strong>Notifications</strong> such as workout reminders and your
            weekly recap are scheduled on your iPhone.
          </li>
        </ul>

        <h2>Services Stride talks to</h2>
        <ul>
          <li>
            <strong>Apple Intelligence.</strong> The AI coach, coach tips, week
            in review and race plan are written by Apple Intelligence, either on
            your iPhone or on Apple&apos;s Private Cloud Compute, where Apple
            processes the request without keeping it. I never receive these
            requests or their answers. You can turn them off with the AI Coach
            switch in Stride&apos;s Settings.
          </li>
          <li>
            <strong>Apple Weather (WeatherKit) and Apple Maps</strong> receive a
            location to return a forecast or a map.
          </li>
          <li>
            <strong>OpenRouteService</strong> receives route coordinates only if
            you add your own OpenRouteService key in Settings to generate
            routes. Its handling is covered by{' '}
            <a href="https://openrouteservice.org/privacy-policy/">
              its own privacy policy
            </a>
            .
          </li>
        </ul>

        <h2>Sharing and exporting</h2>
        <p>
          Nothing leaves the app unless you send it. When you share a run card
          or a run&apos;s GPX route (for example to Strava or Garmin Connect),
          or use Export All Data, Stride hands the file to the iOS share sheet
          and you choose where it goes. Once it is there, the receiving app or
          service&apos;s own policy applies.
        </p>

        <h2>Your choices</h2>
        <p>
          You can change any permission in the iOS Settings app at any time.
          Stride → Settings → Export All Data gives you a copy of your runs,
          strength sessions, shoes and routes. Stride → Settings → Reset All
          Data deletes your data from your iPhone and your iCloud. Runs Stride
          saved to Apple Health stay there until you delete them in the Health
          app.
        </p>

        <h2>Children</h2>
        <p>Stride is not directed at children under 13.</p>

        <h2>This website</h2>
        <p>
          jacobreed.dev uses Vercel Analytics and Speed Insights to count page
          views and measure load times, without cookies. The app does not.
        </p>

        <h2>Changes and contact</h2>
        <p>
          If this policy changes, I&apos;ll update the date above and say so in
          the app&apos;s release notes. Questions:{' '}
          <a href={`mailto:${strideContactEmail}`}>{strideContactEmail}</a>.
        </p>

        <p>
          <Link href="/stride/support">Stride support</Link>
        </p>
      </article>
    </div>
  );
}
