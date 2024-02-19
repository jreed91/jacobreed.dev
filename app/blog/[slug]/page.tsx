import { getBlogPosts } from 'app/db/blog';
import BlogLayout from '../../components/BlogLayout';
import { notFound } from 'next/navigation';

export default function Blog({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogLayout blog={post}>
    </BlogLayout>
  );
}
