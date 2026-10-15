import Image from 'next/image';
import classNames from 'classnames';

/**
 * A screenshot inside project MDX content. Rendered as a figure so the caption is
 * associated with the image rather than reading as body copy. Phone and popover
 * shots stay narrow; pass `wide` for landscape terminal or desktop captures.
 */
export default function Screenshot({
  src,
  alt,
  caption,
  width,
  height,
  wide = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  wide?: boolean;
}) {
  return (
    <figure className="my-8 not-prose">
      <div className="flex justify-center">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={classNames(
            'w-full h-auto rounded-xl border border-gray-200 dark:border-gray-800',
            wide ? 'max-w-full' : 'max-w-sm'
          )}
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
