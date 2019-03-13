# gatsby-source-itchio

A source plugin for [GatsbyJS](https://www.gatsbyjs.org/) to query game information from the [itch.io](https://itch.io/) serverside API.

## Install

```
# npm
npm install --save gatsby-source-itchio

#yarn
yarn add gatsby-source-itchio
```

Then add the following to your `gatsby-config.js`:

```javascript
module.exports = {
  /* ... */
  plugins: [
    /* ... */
    {
      resolve: "gatsby-source-itchio",
      options: {
        key: // YOUR_API_KEY
      }
    }
  ]
};
```

To use this plugin, you'll need a web API key for your itch.io account (get one [here](https://itch.io/user/settings/api-keys)).

## How to query

See [API documentation](https://itch.io/docs/api/serverside#reference/profilegames-httpsitchioapi1keymy-games) for the endpoint here.

```javascript
const gameQuery = `
  query GameQuery {
    allItchioGame(limit: 10) {
      edges {
        node {
          user {
            display_name,
            id,
            url,
            cover_url,
            username
          },
          id,
          url,
          created_at,
          title,
          classification,
          type,
          short_text,
          published,
          published_at,
          views_count,
          can_be_bought,
          min_price,
          purchases_count,
          p_osx,
          p_android,
          p_linux,
          p_windows,
          in_press_system,
        }
      }
    }
  }
`;
```
