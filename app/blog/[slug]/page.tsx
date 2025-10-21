import { getBlogPosts } from 'app/db/blog';
import BlogLayout from '../../components/BlogLayout';
import { notFound } from 'next/navigation';

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogLayout blog={post}>
    </BlogLayout>
  );
}
