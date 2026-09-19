import {
  ogImageContentType,
  ogImageSize,
  renderOgCard,
} from 'app/utils/ogCard';

export const alt = 'Jacob Reed - Software Engineer';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: 'Software Engineer',
    title: 'Jacob Reed',
    meta: 'AWS • DevOps • Databases',
  });
}
