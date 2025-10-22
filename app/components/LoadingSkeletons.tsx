export function BlogPostSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-16 animate-pulse">
      <div className="flex flex-col items-start justify-center w-full">
        {/* Title skeleton */}
        <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mb-4" />

        {/* Author info skeleton */}
        <div className="flex items-center mt-2 gap-2">
          <div className="h-6 w-6 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-48" />
        </div>

        {/* Table of contents skeleton */}
        <div className="w-full mt-6 space-y-2">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-32" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-48 ml-4" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-44 ml-4" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-52 ml-4" />
        </div>

        {/* Content skeleton */}
        <div className="w-full mt-8 space-y-3">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full mt-6" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}

export function ReactionsSkeleton() {
  return (
    <div className="border-y border-neutral-200 dark:border-neutral-800 py-8 my-12 animate-pulse">
      <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-64 mb-4" />
      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-96 mb-6" />

      <div className="flex gap-4">
        <div className="h-12 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="h-12 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="h-12 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
      </div>
    </div>
  );
}

export function RelatedPostsSkeleton() {
  return (
    <div className="mt-16 border-t border-neutral-200 dark:border-neutral-800 pt-8 animate-pulse">
      <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-48 mb-6" />

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mb-2" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableOfContentsSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-2">
      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-32" />
      <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-48 ml-4" />
      <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-44 ml-4" />
      <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-52 ml-4" />
    </div>
  );
}
