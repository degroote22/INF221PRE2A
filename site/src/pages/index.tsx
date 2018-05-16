import * as React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }: { data: any }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great!</p>
    {data.allMarkdownRemark.edges.map(({ node }: { node: any }) => (
      <div key={node.id}>
        <p dangerouslySetInnerHTML={{ __html: node.html }} />
      </div>
    ))}
  </div>
)

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          excerpt
          html
        }
      }
    }
  }
`

export default IndexPage
