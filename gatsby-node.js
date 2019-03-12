const axios = require('axios');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, configOptions) => {
  const { createNode } = actions;

  const { key } = configOptions;
  const apiUrl = `https://itch.io/api/1/${key}/my-games`;
  const { data } = await axios.get(apiUrl);
  const { games } = data;

  const gameNodes = games.map((game) => {
    const nodeId = createNodeId(`itchio-game-${game.id}`);
    const nodeContent = JSON.stringify(game);
    const nodeData = {
      ...game,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'ItchioGame',
        content: nodeContent,
        contentDigest: createContentDigest(game),
      },
    };

    return nodeData;
  });

  gameNodes.forEach(node => createNode(node));
};
