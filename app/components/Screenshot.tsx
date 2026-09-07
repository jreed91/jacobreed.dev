import Image from 'next/image';

/**
 * A screenshot inside project MDX content. Rendered as a figure so the caption is
 * associated with the image rather than reading as body copy.
 */
export default function Screenshot({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="my-8 not-prose">
      <div className="flex justify-center">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full max-w-sm h-auto rounded-xl border border-gray-200 dark:border-gray-800"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
