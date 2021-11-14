import {
    ComputedFields,
    defineDocumentType,
    makeSource
  } from 'contentlayer/source-files';
  import rehypeSlug from 'rehype-slug';
  import rehypeCodeTitles from 'rehype-code-titles';
  import readingTime from 'reading-time';

  const computedFields: ComputedFields = {
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
    wordCount: {
      type: 'number',
      resolve: (doc) => doc.body.raw.split(/\s+/gu).length
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
    }
  };
  
  const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: 'blog/*.mdx',
    bodyType: 'mdx',
    fields: {
      title: { type: 'string', required: true },
      date: { type: 'string', required: true },
      summary: { type: 'string', required: true },
      image: { type: 'string', required: true }
    },
    computedFields
  }));
  
  
  const contentLayerConfig = makeSource({
    contentDirPath: 'data',
    documentTypes: [Blog],
    mdx: {
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles      ]
    }
  });
  
  export default contentLayerConfig;