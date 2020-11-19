import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <section class="text-gray-700 body-font">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 container px-5 py-24 mx-auto">
        <div class="flex flex-col">
          <div class="h-1 bg-gray-200 rounded overflow-hidden">
            <div class="w-48 h-full bg-indigo-500"></div>
          </div>
          <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
            <h1 class="sm:w-4/6 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">Writing</h1>
            <p class="sm:w-2/6 leading-relaxed text-base sm:pl-20 pl-0">My thoughts on tech, life and everything in between.</p>
          </div>
        </div>
        <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        {posts &&
            posts.map(({ node: post }) => (
          <div class="p-4 md:w-1/3 sm:mb-0 mb-6" key={post.id}>
            
            <div class="rounded-lg h-64 overflow-hidden">
            {post.frontmatter.featuredimage ? (
                    <div className="transform scale-100">
                      <figure class="image">
                        <PreviewCompatibleImage
                          className="object-cover object-center h-full w-full"
                          imageInfo={{
                            image: post.frontmatter.featuredimage,
                            alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                          }}
                        />
                      </figure>
                    </div>
                  ) : null}
            </div>
            <h2 class="text-xl font-medium title-font text-gray-900 mt-5">{post.frontmatter.title}</h2>
            <p class="text-base leading-relaxed mt-2">{post.excerpt}</p>
            <Link
                      className="text-blue-500 inline-flex items-center mt-3 "
                        to={post.fields.slug}
                      >
                        Keep reading
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
                      </Link>
          </div>
          ))}
        </div>
      </div>
    </section>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
