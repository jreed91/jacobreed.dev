import { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from 'app/components/ContactForm';
import NewsletterForm from 'app/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'React 19 & Next.js 15 Demo',
  description: 'Showcasing the latest React 19 hooks and Next.js 15 Server Actions',
};

export default function DemoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4">
          React 19 & Next.js 15 Demo
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Exploring cutting-edge features in modern web development
        </p>
      </div>

      {/* Features Overview */}
      <div className="mb-16 grid md:grid-cols-4 gap-6">
        <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold mb-2">Server Actions</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Form submission handled server-side with type-safe actions
          </p>
        </div>

        <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div className="text-2xl mb-2">🎣</div>
          <h3 className="font-semibold mb-2">useActionState</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            React 19 hook for managing form state and responses
          </p>
        </div>

        <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div className="text-2xl mb-2">⏳</div>
          <h3 className="font-semibold mb-2">useFormStatus</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Track pending states for better user feedback
          </p>
        </div>

        <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div className="text-2xl mb-2">🌊</div>
          <h3 className="font-semibold mb-2">Streaming</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Progressive page rendering with React Suspense
          </p>
        </div>
      </div>

      {/* Contact Form Demo */}
      <section className="mb-16">
        <ContactForm />
      </section>

      {/* Newsletter Form Demo */}
      <section className="mb-16 p-8 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Subscribe to Updates</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          A simpler form showcasing the same React 19 patterns
        </p>
        <NewsletterForm />
      </section>

      {/* Technical Details */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Technical Details</h2>
        <div className="prose dark:prose-invert max-w-none">
          <h3>What&apos;s Happening Here?</h3>

          <h4>1. Server Actions (Next.js 15)</h4>
          <p>
            Forms submit directly to server-side functions marked with{' '}
            <code>&apos;use server&apos;</code>. No API routes needed! This provides:
          </p>
          <ul>
            <li>Type-safe form handling</li>
            <li>Automatic error boundaries</li>
            <li>Progressive enhancement (works without JS)</li>
            <li>Reduced client-side JavaScript</li>
          </ul>

          <h4>2. useActionState Hook (React 19)</h4>
          <p>
            Manages form state, pending states, and server responses. Returns the
            current state and a form action function that automatically tracks
            submission status.
          </p>

          <h4>3. useFormStatus Hook (React 19)</h4>
          <p>
            Provides information about the parent form&apos;s submission status. Perfect
            for submit buttons that need to show loading states without managing
            their own state.
          </p>

          <h3>Code Example</h3>
          <pre className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 p-4 rounded-lg overflow-x-auto">
{`'use client';

import { useActionState, useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Sending...' : 'Send'}
    </button>
  );
}

export default function Form() {
  const [state, formAction] = useActionState(serverAction, null);

  return (
    <form action={formAction}>
      <input name="email" required />
      <SubmitButton />
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}`}
          </pre>

          <h3>Benefits Over Traditional Approaches</h3>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left">Traditional</th>
                <th className="text-left">Server Actions + React 19</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Create API route</td>
                <td>✅ No API route needed</td>
              </tr>
              <tr>
                <td>Manual fetch() calls</td>
                <td>✅ Automatic form handling</td>
              </tr>
              <tr>
                <td>Manual loading states</td>
                <td>✅ Built-in pending tracking</td>
              </tr>
              <tr>
                <td>Manual error handling</td>
                <td>✅ Automatic error boundaries</td>
              </tr>
              <tr>
                <td>Requires JavaScript</td>
                <td>✅ Progressive enhancement</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Streaming & Suspense Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">React Suspense + Streaming</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            All blog posts now use <strong>React Suspense</strong> with <strong>streaming</strong> to
            progressively render content as it becomes available. This provides:
          </p>

          <ul>
            <li><strong>Faster perceived performance</strong> - Users see content immediately as it loads</li>
            <li><strong>Better UX</strong> - Loading skeletons show exactly what&apos;s coming</li>
            <li><strong>Granular loading states</strong> - Each section loads independently</li>
            <li><strong>SEO friendly</strong> - Critical content streams first</li>
          </ul>

          <h3>How It Works</h3>
          <p>
            Visit any blog post to see streaming in action. The page loads in stages:
          </p>

          <ol>
            <li><strong>Main content</strong> - Blog post loads first (300ms delay)</li>
            <li><strong>Reactions</strong> - Interactive reactions stream in next</li>
            <li><strong>Related posts</strong> - Suggestions stream in last (1.5s delay)</li>
          </ol>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg my-6">
            <p className="text-sm font-semibold mb-2">💡 Try it yourself:</p>
            <p className="text-sm mb-0">
              Visit <Link href="/blog/CDK" className="underline">any blog post</Link> and watch the
              content progressively stream in. Notice the skeleton loaders that give instant
              feedback while content loads.
            </p>
          </div>

          <h3>Code Example</h3>
          <pre className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 p-4 rounded-lg overflow-x-auto">
{`import { Suspense } from 'react';

export default function BlogPost() {
  return (
    <article>
      {/* Main content */}
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogContent />
      </Suspense>

      {/* Reactions (independent) */}
      <Suspense fallback={<ReactionsSkeleton />}>
        <BlogReactions />
      </Suspense>

      {/* Related posts (slowest) */}
      <Suspense fallback={<RelatedPostsSkeleton />}>
        <RelatedPosts />
      </Suspense>
    </article>
  );
}`}
          </pre>
        </div>
      </section>

      {/* Version Info */}
      <section className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
        <h3 className="font-semibold mb-3">Powered By</h3>
        <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
          <li>• React 19.2.0 (latest)</li>
          <li>• Next.js 15.5.6 (latest)</li>
          <li>• Server Actions (stable)</li>
          <li>• useActionState, useFormStatus, useOptimistic hooks (stable)</li>
          <li>• React Suspense + Streaming (stable)</li>
        </ul>
      </section>
    </div>
  );
}
