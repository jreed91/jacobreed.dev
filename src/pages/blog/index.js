import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
          <div className="container">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="section">
                  <h2
                    className="title is-size-3 has-text-weight-bold has-text-primary">
                    Writing
                  </h2>
                  <section className="section">
            <div className="container">
              <div className="content">
                <BlogRoll />
              </div>
            </div>
          </section>
                </div>
              </div>
            </div>
          </div>
          
      </Layout>
        )
      }
    }
