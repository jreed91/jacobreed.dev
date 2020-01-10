module.exports = {
  siteMetadata: {
    title: 'Jacob Reed | A Stream-of-Consciousness',
    description:
      'A website dedicated to tech, photos, music and travel',
    siteUrl: 'https://jacobreed.dev',
    author: 'Jacob Reed'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-feed-generator',
      options: {
      generator: `GatsbyJS`,
      rss: true, // Set to true to enable rss generation
      json: true, // Set to true to enable json feed generation
      siteQuery: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              author
            }
          }
        }
      `,
      feeds: [
        {
          name: 'feed', // This determines the name of your feed file => feed.json & feed.xml
          query: `
          {
            allMarkdownRemark(
              sort: {order: DESC, fields: [frontmatter___date]},
              filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
              limit: 100,
              ) {
              edges {
                node {
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    date
                    title
                    syndicate
                  }
                }
              }
            }
          }
          `,
          normalize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return {
                title: edge.node.frontmatter.title,
                date: edge.node.frontmatter.date,
                syndicate: edge.node.frontmatter.syndicate,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                html: edge.node.html,
              }
            })
          },
        },
      ],
    },
  },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}