import {
    ComputedFields,
    defineDocumentType,
    makeSource
  } from 'contentlayer/source-files';
  import rehypeSlug from 'rehype-slug';
  import rehypeCodeTitles from 'rehype-code-titles';
  import rehypePrism from 'rehype-prism-plus';
  
  const computedFields: ComputedFields = {
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
        rehypeCodeTitles,
        rehypePrism
      ]
    }
  });
  
  export default contentLayerConfig;