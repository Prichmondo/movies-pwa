module.exports = {
  siteMetadata: {
    title: `WhatMovie`,
    description: `WhatMovie helps you to find the movie you want to watch tonight!`,
    author: `Riccardo Volpato`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Source+Sans+Pro:ital`,
            variants: [`200`, `400`, `600`]
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#031d33`,
        theme_color: `#031d33`,
        display: `minimal-ui`
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /icons/
        }
      }
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
          bucketName: 'whatmovie',
          region: 'eu-west-1',
          protocol: "https",
          hostname: "d2rmcevhslds2n.cloudfront.net"
      }
      // .\node_modules\.bin\cross-env CI=true AWS_ACCESS_KEY_ID=<key> AWS_SECRET_ACCESS_KEY=<secret> .\node_modules\.bin\gatsby-plugin-s3 deploy --yes
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
