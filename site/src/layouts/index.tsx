import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize'
import '../styles/normalize'

import Header from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
      siteUrl: string
      type: string
      siteName: string
    }
  },
  file: {
    childImageSharp: {
      resize: {
        src: string
      }
    }
  }
}

const IndexLayout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          host
          siteMetadata {
            title
            description
            siteUrl
            type
            siteName
          }
        }
        file(relativePath: {eq: "logo.png"}) {
          childImageSharp {
            resize(width: 200) {
              src
            }
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <LayoutRoot>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
            { property: 'og:title', content: data.site.siteMetadata.title },
            { property: 'og:description', content: data.site.siteMetadata.description },
            { property: 'og:url', content: data.site.siteMetadata.siteUrl },
            { property: 'og:type', content: data.site.siteMetadata.type },
            { property: 'og:site_name', content: data.site.siteMetadata.siteName },
            { property: 'og:image', content: data.site.siteMetadata.siteUrl + data.file.childImageSharp.resize.src }
          ]}
        />
        <Header title={data.site.siteMetadata.title} />
        <LayoutMain>{children}</LayoutMain>
      </LayoutRoot>
    )}
  />
)

export default IndexLayout
